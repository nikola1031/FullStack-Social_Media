import { RouteObject } from 'react-router-dom';
import PathConstants from './PathConstants.ts';
import Home from '../components/Home/Home.tsx';
import Register from '../components/auth/Register/Register.tsx';
import Login from '../components/auth/Login/Login.tsx';
import Friends from '../components/Profile/Friends/Friends.tsx';
import Posts from '../components/Profile/Posts/Posts.tsx';
import Profile from '../components/Profile/Profile.tsx';
import Photos from '../components/Profile/Photos/Photos.tsx';
import EditProfile from '../components/Profile/EditProfile/EditProfile.tsx';
import ChangePassword from '../components/Profile/ChangePassword/ChangePassword.tsx';

import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/auth/useAuthContext.ts';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuthContext();

    if (user) {
        return <Navigate to="/" />;
    }

    return children;
};

const routes: RouteObject[] = [
    { path:PathConstants.Home, element: <PrivateRoute><Home /></PrivateRoute> },
    { path: PathConstants.Register, element: <PublicRoute><Register /></PublicRoute> },
    { path: PathConstants.Login, element: <PublicRoute><Login /></PublicRoute> },
    {
      path: `${PathConstants.Profile}/:id`,
      element: <PrivateRoute><Profile /></PrivateRoute>,
      children: [
        { path: PathConstants.Posts, element: <PrivateRoute><Posts /></PrivateRoute> },
        { path: PathConstants.Photos, element: <PrivateRoute><Photos /></PrivateRoute> },
        { path: PathConstants.Friends, element: <PrivateRoute><Friends /></PrivateRoute> },
        { path: PathConstants.Edit, element: <PrivateRoute><EditProfile /></PrivateRoute> },
        { path: PathConstants.ChangePassword, element: <PrivateRoute><ChangePassword /></PrivateRoute> },
      ],
    },
  ];

export default routes;
