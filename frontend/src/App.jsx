import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import Layout from './pages/Layout';
import Home from './pages/HomePage';
import ReservationPage from './pages/ReservationPage';
import MealsPage from './pages/MealsPage';
import NotFoundPage from './pages/NotFoundPage';
import ReviewPage from './pages/ReviewPage';

// Context Provider
import { MealsProvider } from './contexts/MealsContext';

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },

            {
                path: '/meals',
                element: <MealsPage />,
            },
            {
                path: '/reservation/:mealId',
                element: <ReservationPage />,
            },
            {
                path: 'reviews',
                element: <ReviewPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);

export default function App() {
    return (
        <MealsProvider>
            <RouterProvider router={router} />
        </MealsProvider>
    );
}
