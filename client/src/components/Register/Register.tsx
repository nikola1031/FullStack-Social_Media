import { useState } from 'react'
import '../../styles/forms.css';
import { register } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Register(){
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');
    const [gender, setGender] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        register({username, email, password, confirmPass, gender}).then((res) => {
            navigate('/');
        }).catch(console.error);

    };

    return (
        <div className='form-wrapper'>
        <form onSubmit={handleSubmit} className="form-container">
            <h2 className="form-title">Register</h2>
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
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
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
            <div className="form-group">
                <label htmlFor="confirmPass">Confirm Password</label>
                <input 
                    type="password" 
                    id="confirmPass"
                    name="confirmPass" 
                    value={confirmPass} 
                    onChange={(e) => setConfirmPass(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Gender</label>
                <div className='radio-group'>
                    <input 
                        type="radio" 
                        id="male"
                        name="gender" 
                        value="male" 
                        checked={gender === 'male'} 
                        onChange={(e) => setGender(e.target.value)} 
                        required 
                    />
                    <label htmlFor="male">Male</label>
                </div>
                <div className='radio-group'>
                    <input 
                        type="radio" 
                        id="female"
                        name="gender" 
                        value="female" 
                        checked={gender === 'female'} 
                        onChange={(e) => setGender(e.target.value)} 
                        required 
                    />
                    <label htmlFor="female">Female</label>
                </div>
            </div>
            <button type="submit" className="submit-btn">Register</button>
        </form>
        </div>
    );
};