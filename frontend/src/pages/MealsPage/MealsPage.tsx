import React from 'react';
import styles from './MealsPage.module.css';
import MealsList from '../../components/MealsList/MealsList';
import Search from '../../components/Search/Search';

const MealsPage: React.FC = () => {
    return (
        <main className={styles.main}>
            <Search />
            <MealsList />
        </main>
    );
};

export default MealsPage;
