import React, { useContext, useEffect } from 'react';
import { MealsContext } from '../contexts/MealsContext';
import styles from '../styles/components/MealsList.module.css';

// Components
import Meal from './Meal';

export default function MealsList() {
    const { meals, searchQuery, dispatch } = useContext(MealsContext);

    useEffect(() => {
        (async () => {
            let res;
            if (searchQuery) {
                res = await fetch(
                    `${
                        import.meta.env.VITE_APP_URL
                    }/api/meals?title=${searchQuery}`
                );
            } else {
                res = await fetch(`${import.meta.env.VITE_APP_URL}/api/meals`);
            }

            const json = await res.json();

            if (res.ok) {
                dispatch({ type: 'SET_MEALS', payload: json });
            }
        })();
    }, [dispatch, searchQuery]);

    return (
        <>
            <ul className={styles.meals}>
                {meals.length ? (
                    meals.map(meal => <Meal meal={meal} key={meal.id} />)
                ) : (
                    <h2>There are no meals in the database</h2>
                )}
            </ul>
        </>
    );
}
