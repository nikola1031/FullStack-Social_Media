import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './routes';
import { useTitle } from './hooks/useTitle';

function App() {

    useTitle('Gather Grid');

    const router = createBrowserRouter([
        {
            element: <Layout />,
            errorElement: <div>Error</div>,
            children: routes
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;

// Do router stuff in the App
// Top level element will be rendered as a layout, everything under will be a child rendered in the outlet
// main.tsx renders the App and nothing else
