import { ChangeEvent, useState } from 'react';
import '../../styles/forms.css';
import * as authApi from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Register() {
   
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPass: '',
        gender: '',
    });

    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPass: '',
        gender: '',
    })
    
    const navigate = useNavigate();
    const { saveUser } = useAuthContext();
    
    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        setFormValues((oldValues) => ({...oldValues, [e.target.name]: e.target.value}));
    }

    function handleSubmit (e: React.SyntheticEvent) {
        e.preventDefault();

        const { username, email, password, confirmPass, gender } = formValues;
        authApi
            .register({ username, email, password, confirmPass, gender })
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
                <h2 className="form-title">Register</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formValues.username}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
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
                <div className="form-group">
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPass"
                        name="confirmPass"
                        value={formValues.confirmPass}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <div className="radio-group">
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={formValues.gender === 'male'}
                            onChange={changeHandler}
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
                            checked={formValues.gender === 'female'}
                            onChange={changeHandler}
                            required
                        />
                        <label htmlFor="female">Female</label>
                    </div>
                </div>
                <button type="submit" className="submit-btn">
                    Register
                </button>
            </form>
        </div>
    );
}
