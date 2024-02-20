import '../../styles/forms.css';
import { useTitle } from '../../hooks/useTitle';
import { Link } from 'react-router-dom';
import { useLogin } from './useLogin';
import Loader from '../UI/Loader/Loader';
import { useForm } from '../../hooks/useForm';
import { validateEmpty } from '../../utils/validators';

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
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="form-title">Log in to your account</h2>
                {error && <p className="error-msg-main">{error}</p>}
                <div className="form-group">
                    <label className='form-label' htmlFor="email">Email</label>
                    <input
                        className={`form-input ${Object.values(errors.email).some(error => error) ? 'input-error' : ''}`}
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={hadleChange}
                        onBlur={(e) => setValidators([validateEmpty()], e)}
                        
                    />
                    {errors.email && <p className="error-msg">{errors.email.empty}</p>}
                    
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="password">Password</label>
                    <input
                        className={`form-input ${Object.values(errors.password).some(error => error) ? 'input-error' : ''}`}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={hadleChange}
                        onBlur={(e) => setValidators([validateEmpty()], e)}
                        required
                    />
                    {errors.password && <p className="error-msg">{errors.password.empty?.toString()}</p>}
                </div>
                <button type="submit" disabled={isLoading} className="submit-btn">
                    {isLoading ? <Loader size='small' /> : 'Login'}
                </button>
            </form>
            <p>Don't have an account? <Link className="form-link" to={'/register'}>Register</Link></p>
        </div>
    );
}
