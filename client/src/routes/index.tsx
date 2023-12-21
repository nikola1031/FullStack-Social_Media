import { RouteObject } from 'react-router-dom';
import PathConstants from './PathConstants.ts';
import Home from '../components/Home/Home.tsx';
import Register from '../components/Register/Register.tsx';
import Login from '../components/Login/Login.tsx';
import Friends from '../components/Friends/Friends.tsx';
import LikedPosts from '../components/LikedPosts/LikedPosts.tsx';
import Profile from '../components/Profile/Profile.tsx';
import Photos from '../components/Photos/Photos.tsx';

const routes: RouteObject[] = [
    { path: PathConstants.Home, element: <Home /> },
    { path: PathConstants.Register, element: <Register /> },
    { path: PathConstants.Login, element: <Login /> },
    { path: PathConstants.Profile, element: <Profile />, children: [
        { path: PathConstants.LikedPosts, element: <LikedPosts /> },
        { path: PathConstants.Photos, element: <Photos /> },
        { path: PathConstants.Friends, element: <Friends /> }

    ] },
];

export default routes;
