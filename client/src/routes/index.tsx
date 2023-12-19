import { RouteObject } from 'react-router-dom';
import PathConstants from './PathConstants.ts';
import Home from '../components/Home/Home.tsx';
import Register from '../components/Register/Register.tsx';
import Login from '../components/Login/Login.tsx';
import Friends from '../components/Friends/Friends.tsx';
import LikedPosts from '../components/LikedPosts/LikedPosts.tsx';
import Profile from '../components/Profile/Profile.tsx';

const routes: RouteObject[] = [
    { path: PathConstants.Home, element: <Home /> },
    { path: PathConstants.Register, element: <Register /> },
    { path: PathConstants.Login, element: <Login /> },
    { path: PathConstants.Friends, element: <Friends /> },
    { path: PathConstants.LikedPosts, element: <LikedPosts /> },
    { path: PathConstants.Profile, element: <Profile /> },
];

export default routes;
