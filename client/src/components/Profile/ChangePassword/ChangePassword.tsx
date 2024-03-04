import '../../../styles/forms.css';
import './ChangePassword.css';
import { useTitle } from '../../../hooks/useTitle';
import { useForm } from '../../../hooks/useForm';
import { useChangePassword } from './useChangePassword';
import Loader from '../../UI/Loader/Loader';
import { validateEmpty, validateLength, validatePasswords, validatePattern } from '../../../utils/validators';
import { VALIDATION_PATTERNS } from '../../../Constants';
import Toast from '../../UI/Toast/Toast';

export default function ChangePassword() {
    useTitle('Change Password');

    const {
        checkFormValidity,
        hadleChange,
        setValidators,
        resetForm,
        values,
        errors,
    } = useForm({ 
        password: '',
        newPassword: '',
        confirmPass: '',
    })

    const { loading, error, success, updatePassword } = useChangePassword();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!checkFormValidity()) return;
        updatePassword(values)
        resetForm();
    };

    return (
        <section className="form-positioner">
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="form-title">Update Password</h2>
                {success && <Toast message={success} type='success'/>}
                {error && <Toast message={error} type='error'/>}
                <div className="form-group">
                    <label className='form-label' htmlFor="password">Old Password</label>
                    <input
                        className={`form-input ${Object.values(errors.password).some(error => error) ? 'input-error' : ''}`}
                        type="password"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={hadleChange}
                        onBlur={(e) => setValidators([validateEmpty()], e)}
                        required
                    />
                    {errors.password && Object.entries(errors.password).map(([key, error]) => {
                            return <p key={key} className="error-msg">{error}</p>
                        })}
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="newPassword">New Password</label>
                    <input
                       className={`form-input ${Object.values(errors.newPassword).some(error => error) || errors.confirmPass.match ? 'input-error' : ''}`}
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={values.newPassword}
                        onChange={hadleChange}
                        onBlur={(e) => setValidators([
                            validateEmpty(), 
                            validateLength(8, 40), 
                            validatePattern(VALIDATION_PATTERNS.password)
                        ], e)}
                        required
                    />
                    {errors.newPassword && Object.entries(errors.newPassword).map(([key, error]) => {
                            return <p key={key} className="error-msg">{error}</p>
                        })}
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="confirmPass">Confirm Password</label>
                    <input
                        className={`form-input ${Object.values(errors.confirmPass).some(error => error) ? 'input-error' : ''}`}
                        type="password"
                        id="confirmPass"
                        name="confirmPass"
                        value={values.confirmPass}
                        onChange={hadleChange}
                        onBlur={(e) => setValidators([validateEmpty(), validatePasswords(values.newPassword)], e)}
                        required
                    />
                    {errors.confirmPass && Object.entries(errors.confirmPass).map(([key, error]) => {
                            return <p key={key} className="error-msg">{error}</p>
                        })}
                </div>
                <button disabled={loading} type="submit" className="submit-btn">
                    {loading ? <Loader size='small'/> : 'Update'}
                </button>
            </form>
        </section>
    );
}