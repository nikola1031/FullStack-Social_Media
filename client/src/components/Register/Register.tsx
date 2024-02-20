import '../../styles/forms.css';
import { useTitle } from '../../hooks/useTitle';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useRegister } from './useRegister';
import { validateEmpty, validateLength, validatePasswords, validatePattern } from '../../utils/validators';
import { VALIDATION_PATTERNS } from '../../Constants';

export default function Register() {
    useTitle('Register');
    const { register, error, isLoading } = useRegister();
    
    const {
        checkFormValidity, 
        hadleChange, 
        setValidators, 
        values, 
        errors
    } = useForm({ 
            username: '',
            email: '',
            password: '',
            confirmPass: '',
            gender: ''
        })
    
    function handleSubmit (e: React.SyntheticEvent) {
        e.preventDefault();
        if (!checkFormValidity()) return;
        const { username, email, password, gender } = values;
        register({ username, email, password, gender });
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="form-title">Register New Account</h2>
                {error && <p className="error-msg-main">{error}</p>}
                <div className="form-group">
                    <label className='form-label' htmlFor="username">Username</label>
                    <input
                        className={`form-input ${Object.values(errors.username).some(error => error) ? 'input-error' : ''}`}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={values.username}
                        onChange={hadleChange}
                        onBlur={(e) => setValidators([validateEmpty(), validateLength(3, 16), validatePattern(VALIDATION_PATTERNS.username)], e)}
                        required
                        />
                    {errors.username && Object.values(errors.username).map(error => {
                            return <p key={error} className="error-msg">{error}</p>
                        })}
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="email">Email</label>
                    <input
                        className={`form-input ${Object.values(errors.email).some(error => error) ? 'input-error' : ''}`}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={hadleChange}
                        onBlur={(e) => setValidators([validateEmpty(), validatePattern(VALIDATION_PATTERNS.email)], e)}
                        required
                    />
                    {errors.email && Object.values(errors.email).map(error => {
                            return <p key={error} className="error-msg">{error}</p>
                        })}
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="password">Password</label>
                    <input
                        className={`form-input ${Object.values(errors.password).some(error => error) || errors.confirmPass.match ? 'input-error' : ''}`}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={hadleChange}
                        onBlur={(e) => setValidators(
                            [
                                validateEmpty(), 
                                // validatePasswords(values.confirmPass), 
                                validateLength(8, 40), 
                                validatePattern(VALIDATION_PATTERNS.password)
                            ], e)}
                        required
                    />
                    {errors.password && Object.values(errors.password).map(error => {
                            return <p key={error} className="error-msg">{error}</p>
                        })}
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="confirmPass">Confirm Password</label>
                    <input
                        className={`form-input ${Object.values(errors.confirmPass).some(error => error) ? 'input-error' : ''}`}
                        type="password"
                        id="confirmPass"
                        name="confirmPass"
                        placeholder="Confirm Password"
                        value={values.confirmPass}
                        onChange={hadleChange}
                        onBlur={(e) => setValidators([validatePasswords(values.password)], e)}
                        required
                    />
                    {errors.confirmPass && Object.values(errors.confirmPass).map(error => {
                            return <p key={error} className="error-msg">{error}</p>
                        })}
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <div className="radio-group">
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={values.gender === "male"}
                            onChange={hadleChange}
                            required
                        />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div className="radio-group">
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={values.gender === "female"}
                            onChange={hadleChange}
                            required
                        />
                        <label htmlFor="female">Female</label>
                    </div>
                </div>
                <button type="submit" disabled={isLoading} className="submit-btn">
                    Register
                </button>
            </form>
            <p>Already have an account? <Link to={"/login"} className="form-link">Login</Link></p>
        </div>
    );
}
