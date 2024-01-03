import { ChangeEvent, useState } from 'react';
import '../../styles/forms.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import * as authApi from '../../api/auth';

export default function Login() {
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
            .catch(console.error);
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="form-title">Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formValues.email}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formValues.password}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">
                    Login
                </button>
            </form>
        </div>
    );
}
