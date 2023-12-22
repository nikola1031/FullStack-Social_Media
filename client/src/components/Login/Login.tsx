import { useState } from 'react';
import '../../styles/forms.css';

export default function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(username, password);
    };

    return (
        <div className='form-wrapper'>
        <form onSubmit={handleSubmit} className="form-container">
            <h2 className="form-title">Login</h2>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id="username"
                    name="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
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
            <button type="submit" className="submit-btn">Login</button>
        </form>
        </div>
    );
};