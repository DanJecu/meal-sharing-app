import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Star from './Star';
import styles from '../styles/components/Meal.module.css';

export default function Meal({ meal }) {
    const [rating, setRating] = useState([]);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_APP_URL}/api/reviews/${meal.id}`
                );
                if (res.ok) {
                    const json = await res.json();
                    setRating(json);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchReviews();
    }, [meal.id]);

    const averageStars =
        rating.length > 0
            ? rating.reduce((total, review) => total + review.stars, 0) /
              rating.length
            : 0;

    const renderStarList = () => {
        return [1, 2, 3, 4, 5].map(index => (
            <li className={styles.starListItem} key={index}>
                <Star yellow={index <= averageStars} />
            </li>
        ));
    };

    const renderRatingText = () => {
        if (rating.message) {
            return 'no reviews';
        } else if (rating.length === 1) {
            return '1 review';
        } else {
            return `${rating.length} reviews`;
        }
    };

    return (
        <li className={styles.meal}>
            <Link to={`/reservation/${meal.id}`}>
                <h3 className={styles.mealTitle}>{meal.title}</h3>
            </Link>
            <span className={styles.ratings}>({renderRatingText()})</span>
            <ul className={styles.starList}>{renderStarList()}</ul>
            <p className={styles.mealDescription}>{meal.description}</p>
            <span className={styles.mealPrice}>€{parseInt(meal.price)}</span>
        </li>
    );
}
