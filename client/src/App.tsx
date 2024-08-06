import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import routes from './routes';
import { useTitle } from './hooks/useTitle';
import Error from './components/Error/Error';

function App() {
    useTitle('Gather Grid');

    const router = createBrowserRouter([
        {
            element: <Layout />,
            errorElement: <Error />,
            children: routes
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;