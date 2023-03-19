import React from 'react';

import { Link } from 'react-router-dom';

import styles from '../styles/components/Navbar.module.css';

export default function Navbar() {
    return (
        <header className={styles.navbar}>
            <Link to='/'>
                <span className={styles.logo}>
                    <h1 className={styles.logoMeal}>MEAL</h1>
                    <h1 className={styles.logoSharing}>SHARING</h1>
                </span>
            </Link>
            <ul className={styles.navigation}>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/meals'>Meals</Link>
                </li>
                <li>
                    <Link to='/reviews'>Reviews</Link>
                </li>
            </ul>
        </header>
    );
}
