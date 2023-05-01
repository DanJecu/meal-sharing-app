import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MealsContext } from '../contexts/MealsContext';
import styles from '../styles/pages/ReservationPage.module.css';

// Components
import Meal from '../components/Meal';
import FormReservation from '../components/FormReservation';
import { Loading } from '../components/Loading';

export default function ReservationPage() {
    const { mealId } = useParams();
    const { meals } = useContext(MealsContext);

    const meal = meals.find(meal => parseInt(meal.id) === parseInt(mealId));

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
}
