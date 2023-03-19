import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MealsContext } from '../contexts/MealsContext';

import styles from '../styles/pages/ReservationPage.module.css';
import Meal from '../components/Meal';
import FormReservation from '../components/FormReservation';

export default function ReservationPage() {
    const { mealId } = useParams();
    const { meals } = useContext(MealsContext);

    const meal = meals.find(meal => parseInt(meal.id) === parseInt(mealId));

    if (!meal) {
        return (
            <main className={styles.loading}>
                <h4>loading...</h4>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <Meal meal={meal} />
            <FormReservation meal={meal} />
        </main>
    );
}
