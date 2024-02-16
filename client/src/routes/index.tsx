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
// 
// }
// TODO: Finish Home Page {
// - Make photos into a carousell if more than one // Need to fix slow image loading problem due to firebase storage not being a CDN
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
