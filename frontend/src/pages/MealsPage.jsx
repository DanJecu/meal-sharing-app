import React from 'react';

import styles from '../styles/pages/MealsPage.module.css';
import MealsList from '../components/MealsList';
import Search from '../components/Search';

export default function MealsPage() {
    return (
        <main className={styles.main}>
            <Search />
            <MealsList />
        </main>
    );
}
