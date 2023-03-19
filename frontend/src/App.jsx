import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context
import { MealsProvider } from './contexts/MealsContext';

// Pages
import Home from './pages/HomePage';
import ReservationPage from './pages/ReservationPage';
import MealsPage from './pages/MealsPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ReviewPage from './pages/ReviewPage';

function App() {
    return (
        <div className='app'>
            <MealsProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/meals' element={<MealsPage />} />
                        <Route
                            path='/reservation/:mealId'
                            element={<ReservationPage />}
                        />
                        <Route path='/reviews' element={<ReviewPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                    <Footer />
                </Router>
            </MealsProvider>
        </div>
    );
}

export default App;
