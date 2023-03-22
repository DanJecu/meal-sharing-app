import React, { useContext, useState, useEffect } from 'react';
import { MealsContext } from '../contexts/MealsContext';
import searchImg from '../assets/images/search.png';
import styles from '../styles/pages/MealsPage.module.css';
import MealsList from '../components/MealsList';

export default function MealsPage() {
    const [query, setQuery] = useState('');
    const { dispatch, actionTypes } = useContext(MealsContext);

    const handleQuery = e => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        dispatch({ type: actionTypes.SET_SEARCH_QUERY, payload: newQuery });
    };

    // clear the search bar when search component unmounts
    useEffect(() => {
        return () => {
            dispatch({ type: actionTypes.SET_SEARCH_QUERY, payload: '' });
        };
    }, [dispatch]);

    return (
        <main className={styles.main}>
            <div className={styles.search}>
                <img src={searchImg} alt='search icon' width='25' height='25' />
                <input
                    className={styles.searchInput}
                    type='text'
                    value={query}
                    onChange={handleQuery}
                />
            </div>
            <MealsList />
        </main>
    );
}
