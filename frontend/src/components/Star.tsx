import React from 'react';
import styles from '../styles/components/Star.module.css';

interface StarProps {
    yellow: boolean;
}

export const renderStarList = (averageStars: number) => {
    return [1, 2, 3, 4, 5].map((index: number) => (
        <li className={styles.starListItem} key={index}>
            <Star yellow={index <= averageStars} />
        </li>
    ));
};

export default function Star({ yellow }: StarProps) {
    return (
        <svg
            height='35'
            width='35'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M12 2.923
                L13.401 5.88
                L16.67 6.328
                L14.29 8.607
                L14.857 11.742
                L12 10.238
                L9.143 11.742
                L9.71 8.607
                L7.33 6.328
                L10.599 5.88
                Z'
                fill={yellow ? '#FFD700' : 'none'}
                stroke={yellow ? '#FFD700' : 'black'}
                strokeWidth='1'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit='1'
                clipRule='evenodd'
                fillRule='evenodd'
            />
        </svg>
    );
}
