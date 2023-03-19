import React, { useContext } from 'react';
import { MealsContext } from '../contexts/MealsContext';
import styles from '../styles/components/Modal.module.css';

export default function Modal({ text }) {
    const { isModalOpen } = useContext(MealsContext);

    return isModalOpen ? (
        <div className={styles.overlay}>
            <div className={styles.modal}>{text} confirmed!</div>
        </div>
    ) : null;
}
