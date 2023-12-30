import { useState } from 'react';
import '../../styles/forms.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import * as authApi from '../../api/auth';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const { saveUser } = useAuthContext();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        authApi
            .login({ email, password })
            .then((user) => {
                if (user) {
                    saveUser(user);
                    navigate('/');
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
