import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { TiThMenu } from 'react-icons/ti';
import { Link } from 'react-router-dom';

import styles from '../styles/components/Navbar.module.css';

export default function Navbar() {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={styles.navbar}>
            <Link to='/'>
                <span className={styles.logo}>
                    <h1 className={styles.logoMeal}>MEAL</h1>
                    <h1 className={styles.logoSharing}>SHARING</h1>
                </span>
            </Link>
            {/* burger menu */}
            {isMobile && (
                <button
                    className={styles.btnMenu}
                    onClick={toggleMenu}
                    onTouchEnd={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                >
                    <TiThMenu />
                </button>
            )}
            <ul
                className={styles.navigation}
                style={{ display: isMobile && isOpen ? 'none' : 'flex' }}
            >
                <li>
                    <Link to='/' onClick={toggleMenu}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/meals' onClick={toggleMenu}>
                        Meals
                    </Link>
                </li>
                <li>
                    <Link to='/reviews' onClick={toggleMenu}>
                        Reviews
                    </Link>
                </li>
            </ul>
        </header>
    );
}
