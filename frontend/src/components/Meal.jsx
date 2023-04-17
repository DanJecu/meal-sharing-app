import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { renderStarList } from './Star';
import styles from '../styles/components/Meal.module.css';

export default function Meal({ id, title, description, price }) {
    const [rating, setRating] = useState([]);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_APP_URL}/api/reviews/${id}`
                );
                if (res.ok) {
                    const json = await res.json();
                    setRating(json);
                }
            } catch (error) {
                throw new Error(error.message);
            }
        }
        fetchReviews();
    }, [id]);

    const averageStars =
        rating.length > 0
            ? rating.reduce((total, review) => total + review.stars, 0) /
              rating.length
            : 0;

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
            <Link to={`/reservation/${id}`}>
                <h3 className={styles.mealTitle}>{title}</h3>
            </Link>
            <span className={styles.ratings}>({renderRatingText()})</span>
            <ul className={styles.starList}>{renderStarList(averageStars)}</ul>
            <p className={styles.mealDescription}>{description}</p>
            <h3 className={styles.mealPrice}>€{parseInt(price)}</h3>
        </li>
    );
}
