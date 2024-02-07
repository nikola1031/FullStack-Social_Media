import { useState } from 'react';
import './ChangePassword.css';
import * as dataApi from '../../../api/data';
import { useTitle } from '../../../hooks/useTitle';

export default function ChangePassword() {
    useTitle('Change Password');

    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dataApi.updatePassword({password, newPassword, confirmPass});
    };

    return (
        <section className="form-positioner">
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="form-title">Update Password</h2>
                <div className="form-group">
                    <label htmlFor="password">Old Password</label>
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
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                <button type="submit" className="submit-btn">
                    Update
                </button>
            </form>
        </section>
    );
}