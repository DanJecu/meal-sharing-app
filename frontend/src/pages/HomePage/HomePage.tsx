import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button/Button';

import styles from './HomePage.module.css';

export const Home: React.FC = () => {
    return (
        <main className={styles.main}>
            <h2>
                Discover the best meals in Copenhagen with our meal sharing app.
            </h2>
            <p>
                With a wide variety of dishes and cuisines, you're sure to find
                something that tantalizes your taste buds. Our app connects food
                lovers with the best restaurants in Copenhagen, providing an
                immersive dining experience like no other.
            </p>

            <p>
                But our app is more than just a meal directory. It's a platform
                that connects you with the best restaurants in town, allowing
                you to book a table and experience the meals firsthand. With our
                easy-to-use reservation system, you can secure a spot at your
                favorite restaurant and indulge in a culinary adventure that
                you'll never forget.
            </p>

            <p>
                To get started, simply go to the Meals section in our app and
                browse through our wide range of dishes and cuisines. Once
                you've found your favorite meal, select it and follow the easy
                booking process to make a reservation at the restaurant of your
                choice.
            </p>
            <Link to='/meals'>
                <Button text={'Take me to meals'} />
            </Link>
        </main>
    );
};
