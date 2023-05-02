import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MealsContext } from '../contexts/MealsContext';
import styles from '../styles/pages/ReservationPage.module.css';

// Components
import Meal from '../components/Meal';
import FormReservation from '../components/FormReservation';
import { Loading } from '../components/Loading';

const ReservationPage: React.FC = () => {
    const { mealId } = useParams<{ mealId: string }>();
    const { meals } = useContext(MealsContext);

    const meal = mealId && meals.find(meal => meal.id.toString() === mealId);

    if (!meal) {
        return (
            <main className={styles.loading}>
                <Loading />
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <Meal {...meal} />
            <FormReservation {...meal} />
        </main>
    );
};

export default ReservationPage;
