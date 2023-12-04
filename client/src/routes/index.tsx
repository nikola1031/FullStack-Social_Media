import { RouteObject } from 'react-router-dom';
import PathConstants from './PathConstants.js';
import Home from '../components/Home/Home.js';

const routes: RouteObject[] = [
    { path: PathConstants.Home, element: <Home /> },
];

export default routes;
