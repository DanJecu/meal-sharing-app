import React, { useContext, useState, useEffect } from 'react';
import styles from '../styles/components/Search.module.css';
import { MealsContext } from '../contexts/MealsContext';
import searchImg from '../assets/images/search.png';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

export function Search() {
    const { dispatch, actionTypes } = useContext(MealsContext);
    const [query, setQuery] = useState('');
    const [sortKey, setSortKey] = useState('price');
    const [sortDir, setSortDir] = useState('asc');

    // clear the search bar when search component unmounts
    useEffect(() => {
        return () => {
            dispatch({ type: actionTypes.SET_SEARCH_QUERY, payload: '' });
        };
    }, [dispatch]);

    const handleSearchQuery = e => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        dispatch({ type: actionTypes.SET_SEARCH_QUERY, payload: newQuery });
    };

    const handleSortKey = e => {
        const sortKey = e.target.value;
        setSortKey(sortKey);
        dispatch({ type: actionTypes.SET_SORT_KEY, payload: sortKey });
    };

    const handleSortDir = () => {
        const newSortDir = sortDir === 'asc' ? 'desc' : 'asc';
        setSortDir(newSortDir);
        dispatch({ type: actionTypes.SET_SORT_DIR, payload: newSortDir });
    };

    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <img src={searchImg} alt='search icon' width='25' height='25' />
                <input
                    className={styles.searchInput}
                    type='text'
                    value={query}
                    onChange={handleSearchQuery}
                />
            </div>
            <div className={styles.searchFilters}>
                <button onClick={handleSortDir}>
                    {sortDir === 'asc' ? (
                        <FaSortAmountUp />
                    ) : (
                        <FaSortAmountDown />
                    )}
                </button>
                <div className={styles.searchKeys}>
                    <select defaultValue={sortKey} onChange={handleSortKey}>
                        <option value='when'>Date</option>
                        <option value='max_reservations'>Spots</option>
                        <option value='price'>Price</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
