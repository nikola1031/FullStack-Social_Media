import { AuthProvider } from '../contexts/AuthContext';
import Footer from './common/Footer/Footer';
import Header from './common/Header/Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <>
            <AuthProvider>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </AuthProvider>
        </>
    );
}
