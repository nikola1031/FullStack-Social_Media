import './EditProfile.css';
import '../../../styles/forms.css';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { useTitle } from '../../../hooks/useTitle';
import { useForm } from '../../../hooks/useForm';
import { useUpdateProfile } from './useUpdateProfile';
import Loader from '../../UI/Loader/Loader';
import { validateEmpty, validateLength, validatePattern } from '../../../utils/validators';
import { VALIDATION_PATTERNS } from '../../../Constants';
import Toast from '../../UI/Toast/Toast';


export default function EditProfile() {
    useTitle('Edit Profile');
    
    const { user: loggedInUser } = useAuthContext();
    const { error, loading, success, updateProfile } = useUpdateProfile();
    
    const {
        checkFormValidity,
        hadleChange,
        setValidators,
        resetForm,
        values,
        errors,
    } = useForm({ 
        username: loggedInUser!.username,
        email: loggedInUser!.email,
        bio: loggedInUser!.bio,
        password: '',
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!checkFormValidity()) return;
        if (values.email === loggedInUser!.email 
            && values.username === loggedInUser!.username 
            && values.bio === loggedInUser!.bio) {
                return;
            }
        updateProfile(values);
        resetForm('password');
    };

    return (
        <section className="form-positioner">
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="form-title">Edit Profile</h2>
                {success && <Toast message={success} type='success'/>}
                {error && <Toast message={error} type='error'/>}
                <div className="form-group">
                    <label className='form-label' htmlFor="username">Username</label>
                    <input
                        className={`form-input ${Object.values(errors.username).some(error => error) ? 'input-error' : ''}`}
                        type="text"
                        id="username"
                        name="username"
                        value={values.username}
                        onChange={hadleChange}
                        onBlur={(e) => setValidators(
                            [
                                validateEmpty(), 
                                validateLength(3, 16), 
                                validatePattern(VALIDATION_PATTERNS.username)
                        ], e)}
                        required
                    />
                    {errors.username && Object.entries(errors.username).map(([key, error]) => {
                            return <p key={key} className="error-msg">{error}</p>
                        })}
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="email">Email</label>
                    <input
                        className={`form-input ${Object.values(errors.email).some(error => error) ? 'input-error' : ''}`}
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={hadleChange}
                        onBlur={(e) => {
                            setValidators([validateEmpty(), validatePattern(VALIDATION_PATTERNS.email)], e)
                        }}
                        required
                    />
                    {errors.email && Object.entries(errors.email).map(([key, error]) => {
                            return <p key={key} className="error-msg">{error}</p>
                        })}
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="bio">Bio</label>
                    <textarea
                        className={`form-input ${Object.values(errors.bio).some(error => error) ? 'input-error' : ''}`}
                        id="bio"
                        name="bio"
                        value={values.bio}
                        onChange={hadleChange}
                        onBlur={(e) => setValidators([validateEmpty(), validateLength(6, 255)], e)}
                        required
                    />
                    {errors.bio && Object.entries(errors.bio).map(([key, error]) => {
                            return <p key={key} className="error-msg">{error}</p>
                        })}
                </div>
                    <div className="form-group">
                        <label className='form-label' htmlFor="password">Confirm Password</label>
                        <input
                            className={`form-input ${Object.values(errors.password).some(error => error) ? 'input-error' : ''}`}
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Enter password to confirm changes'
                            value={values.password}
                            onChange={hadleChange}
                            onBlur={(e) => setValidators([validateEmpty()], e)}
                        />
                        {errors.password && Object.entries(errors.password).map(([key, error]) => {
                            return <p key={key} className="error-msg">{error}</p>
                        })}
                    </div>

                <button disabled={loading} type="submit" className="submit-btn">
                    {loading ? <Loader size='small' /> : 'Update'}
                </button>
            </form>
        </section>
    );
}
