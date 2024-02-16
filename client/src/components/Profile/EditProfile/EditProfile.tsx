import { useState } from 'react';
import './EditProfile.css';
import '../../../styles/forms.css';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useOutletContext } from 'react-router-dom';
import { ProfileContextType } from '../../../types/data';
import * as dataApi from '../../../api/data';
import { useTitle } from '../../../hooks/useTitle';


export default function EditProfile() {
    useTitle('Edit Profile');
    
    const { user, setUser } = useOutletContext<ProfileContextType>();
    const { user: loggedInUser, saveUser } = useAuthContext();

    const [username, setUsername] = useState<string>(loggedInUser!.username);
    const [email, setEmail] = useState<string>(loggedInUser!.email);
    const [bio, setBio] = useState<string>(user?.bio);
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dataApi.updateProfile({ username, email, bio, password })
            .then(() => {
                setUser((prevUser) => ({...prevUser, username, email, bio}));
                saveUser({...loggedInUser!, email, username})
                setPassword('');
            });
       
    };

    return (
        <section className="form-positioner">
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="form-title">Edit Profile</h2>
                <div className="form-group">
                    <label className='form-label' htmlFor="username">Username</label>
                    <input
                        className='form-input'
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="email">Email</label>
                    <input
                        className='form-input'
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="bio">Bio</label>
                    <textarea
                        className='form-input'
                        id="bio"
                        name="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        required
                    />
                </div>
                {loggedInUser?.email !== email ? (
                    <div className="form-group">
                        <label className='form-label' htmlFor="password">Password</label>
                        <input
                            className='form-input'
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                ) : null}

                <button type="submit" className="submit-btn">
                    Update
                </button>
            </form>
        </section>
    );
}
