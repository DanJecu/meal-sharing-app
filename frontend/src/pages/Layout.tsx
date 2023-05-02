import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

export const Layout: React.FC = () => {
    return (
        <div className='app'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};
