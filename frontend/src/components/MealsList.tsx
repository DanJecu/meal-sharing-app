import React, { useContext } from 'react';
import { MealsContext } from '../contexts/MealsContext';
import styles from '../styles/components/MealsList.module.css';

// Components
import Meal from './Meal';
import { Loading } from './Loading';

const MealsList: React.FC = () => {
    const { meals, isLoading } = useContext(MealsContext);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <ul className={styles.meals}>
                {meals.length ? (
                    meals.map(meal => <Meal {...meal} key={meal.id} />)
                ) : (
                    <h2>There is no meal with this name 😥</h2>
                )}
            </ul>
        </>
    );
};

export default MealsList;
