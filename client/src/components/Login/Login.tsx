import { ChangeEvent, useState } from 'react';
import '../../styles/forms.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import * as authApi from '../../api/auth';
import { useTitle } from '../../hooks/useTitle';
import { Link } from 'react-router-dom';

export default function Login() {
    useTitle('Login');

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate();
    const { saveUser } = useAuthContext();

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        setFormValues((oldValues) => ({...oldValues, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const { email, password } = formValues;
        authApi
            .login({ email, password })
            .then((user) => {
                if (user) {
                    saveUser(user);
                    navigate('/', { replace: true });
                }
            })
            .catch((err) => {
                setFormErrors({email: '', password: ''})
            });
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="form-title">Log in to your account</h2>
                <div className="form-group">
                    <label className='form-label' htmlFor="email">Email</label>
                    <input
                        className='form-input'
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formValues.email}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="password">Password</label>
                    <input
                        className='form-input'
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formValues.password}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">
                    Login
                </button>
            </form>
            <p>Don't have an account? <Link className="form-link" to={'/register'}>Register</Link></p>
        </div>
    );
}
