import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer';
import { Navbar } from '../components/Navbar/Navbar';

export const Layout: React.FC = () => {
    return (
        <div className='app'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};
