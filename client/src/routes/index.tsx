import { RouteObject } from 'react-router-dom';
import PathConstants from './PathConstants.ts';
import Home from '../components/Home/Home.tsx';
import Register from '../components/Register/Register.tsx';
import Login from '../components/Login/Login.tsx';

const routes: RouteObject[] = [
    { path: PathConstants.Home, element: <Home /> },
    { path: PathConstants.Register, element: <Register /> },
    { path: PathConstants.Login, element: <Login /> },

];

export default routes;
