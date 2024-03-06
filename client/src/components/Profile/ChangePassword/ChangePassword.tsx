import formStyles from '../../../styles/forms.module.css';
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
        <section className={formStyles["form-positioner"]}>
            <form onSubmit={handleSubmit} className={formStyles["form-container"]}>
                <h2 className={formStyles["form-title"]}>Update Password</h2>
                {success && <Toast message={success} type='success'/>}
                {error && <Toast message={error} type='error'/>}
                <div className={formStyles["form-group"]}>
                    <label className={formStyles['form-label']} htmlFor="password">Old Password</label>
                    <input
                        className={`${formStyles["form-input"]} ${Object.values(errors.password).some(error => error) ? formStyles['input-error'] : ''}`}
                        type="password"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={hadleChange}
                        onBlur={(e) => setValidators([validateEmpty()], e)}
                        required
                    />
                    {errors.password && Object.entries(errors.password).map(([key, error]) => {
                        if (error) {
                            return <p key={key} className={formStyles["error-msg"]}>{error}</p>
                        }
                        })}
                </div>
                <div className={formStyles["form-group"]}>
                    <label className={formStyles['form-label']} htmlFor="newPassword">New Password</label>
                    <input
                        className={`${formStyles["form-input"]} ${Object.values(errors.newPassword).some(error => error) || errors.confirmPass.match ? formStyles['input-error'] : ''}`}
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
                            if (error) {
                                return <p key={key} className={formStyles["error-msg"]}>{error}</p>
                            }
                        })}
                </div>
                <div className={formStyles["form-group"]}>
                    <label className={formStyles['form-label']} htmlFor="confirmPass">Confirm Password</label>
                    <input
                        className={`${formStyles["form-input"]} ${Object.values(errors.confirmPass).some(error => error) ? formStyles['input-error'] : ''}`}
                        type="password"
                        id="confirmPass"
                        name="confirmPass"
                        value={values.confirmPass}
                        onChange={hadleChange}
                        onBlur={(e) => setValidators([validateEmpty(), validatePasswords(values.newPassword)], e)}
                        required
                    />
                    {errors.confirmPass && Object.entries(errors.confirmPass).map(([key, error]) => {
                            if (error) {
                                return <p key={key} className={formStyles["error-msg"]}>{error}</p>
                            }
                        })}
                </div>
                <button disabled={loading} type="submit" className={formStyles["submit-btn"]}>
                    {loading ? <Loader size='small'/> : 'Update'}
                </button>
            </form>
        </section>
    );
}