import { RouteObject } from 'react-router-dom';
import PathConstants from './PathConstants.ts';
import Home from '../components/Home/Home.tsx';
import Register from '../components/Register/Register.tsx';
import Login from '../components/Login/Login.tsx';
import Friends from '../components/Friends/Friends.tsx';
import Posts from '../components/Posts/Posts.tsx';
import Profile from '../components/Profile/Profile.tsx';
import Photos from '../components/Photos/Photos.tsx';
import EditProfile from '../components/Profile/EditProfile/EditProfile.tsx';
import ChangePassword from '../components/Profile/ChangePassword/ChangePassword.tsx';

// TODO: Finish Profile Page {
// - Make Edit Profile and Change Password work
// - Make Posts and Liked Posts show correct posts and an overlay of post with comments when post is clicked // kinda done
// - Make Remove from Liked button work
// - Make Photos show overlay of enlarged photo when photo is clicked // kinda done
// - Allow deleting of photos
// - Make Friends go to user's profile page when friend is clicked
// - Make Friends count point to the friends route
// - Make Remove Friends button work
// }
// TODO: Finish Home Page {
// - Allow post deleting and editing for authors
// - Make username and avatar point to user's profile page
// - Make clicking on comment username and avatar point to user's profile page
// - Make comment deleting and editing work and be visible for authors - author part not done
// }
// TODO: Add Error page

const routes: RouteObject[] = [
    { path: PathConstants.Home, element: <Home /> },
    { path: PathConstants.Register, element: <Register /> },
    { path: PathConstants.Login, element: <Login /> },
    { path: `${PathConstants.Profile}/:id`, element: <Profile />, children: [
        { path: PathConstants.Posts, element: <Posts /> },
        { path: PathConstants.Photos, element: <Photos /> },
        { path: PathConstants.Friends, element: <Friends /> },
        { path: PathConstants.Edit, element: <EditProfile /> },
        { path: PathConstants.ChangePassword, element: <ChangePassword /> },
    ] },
];

export default routes;
