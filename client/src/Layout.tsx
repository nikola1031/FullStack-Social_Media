import { AuthProvider } from './contexts/AuthContext';
import Footer from './components/common/Footer/Footer';
import Header from './components/common/Header/Header';
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
