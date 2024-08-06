import formStyles from '../../../styles/forms.module.css';
import { useTitle } from '../../../hooks/useTitle';
import { Link } from 'react-router-dom';
import { useLogin } from './useLogin';
import Loader from '../../UI/Loader/Loader';
import { useForm } from '../../../hooks/useForm';
import { validateEmpty } from '../../../utils/validators';

export default function Login() {
    useTitle('Login');

    const { login, error, isLoading } = useLogin();
    const { values, errors, hadleChange, setValidators, checkFormValidity } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!checkFormValidity()) return;
        const { email, password } = values;
        login({email, password});
        console.log('asgasd')
    };
    

    return (
        <div className={formStyles["form-wrapper"]} data-cy="login-form">
            <form onSubmit={handleSubmit} className={formStyles["form-container"]}>
                <h2 className={formStyles["form-title"]} data-cy="login-title">Log in to your account</h2>
                {error && <p className={formStyles["error-msg-main"]} data-cy="login-error">{error}</p>}
                <div className={formStyles["form-group"]} data-cy="email-input">
                    <label className={formStyles["form-label"]} htmlFor="email">Email</label>
                    <input
                        className={`${formStyles["form-input"]} ${Object.values(errors.email).some(error => error) ? formStyles["input-error"] : ''}`}
                        type="text"
                        id="email"
                        data-cy="email-input"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={hadleChange}
                        onBlur={(e) => setValidators([validateEmpty()], e)}
                    />
                    {errors.email && <p className={formStyles["error-msg"]} data-cy="email-error">{errors.email.empty}</p>}
                    
                </div>
                <div className={formStyles["form-group"]} data-cy="password-input">
                    <label className={formStyles["form-label"]} htmlFor="password">Password</label>
                    <input
                        className={`${formStyles["form-input"]} ${Object.values(errors.password).some(error => error) ? formStyles["input-error"] : ''}`}
                        type="password"
                        id="password"
                        data-cy="password-input"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={hadleChange}
                        onBlur={(e) => setValidators([validateEmpty()], e)}
                        required
                    />
                    {errors.password && <p className={formStyles["error-msg"]} data-cy="password-error">{errors.password.empty?.toString()}</p>}
                </div>
                <button type="submit" disabled={isLoading} className={formStyles["submit-btn"]} data-cy="submit-button">
                    {isLoading ? <Loader size='small' /> : 'Login'}
                </button>
            </form>
            <p data-cy="register-link">Don't have an account? <Link className={formStyles["form-link"]} to={'/register'}>Register</Link></p>
        </div>
    );
}