import React, { useState, useContext } from 'react';
import { MealsContext } from '../contexts/MealsContext';
import styles from '../styles/components/FormReservation.module.css';
import Button from './Button';
import Modal from './Modal';

export default function FormReservation({ id, max_reservations }) {
    const { handleModalOpen } = useContext(MealsContext);

    const initialReservationState = {
        number_of_guests: 1,
        contact_name: '',
        contact_phonenumber: '',
        contact_email: '',
    };

    const [reservation, setReservation] = useState(initialReservationState);

    const handleReservation = async e => {
        e.preventDefault();

        let currentDate = new Date().toJSON().slice(0, 10);

        reservation.meal_id = id;
        reservation.created_date = currentDate;

        let response;
        try {
            response = await fetch(
                `${import.meta.env.VITE_APP_URL}/api/reservations`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reservation),
                }
            );
        } catch (error) {
            throw new Error(error);
        }
        if (response.ok) {
            const data = await response.json();
            setReservation(initialReservationState);
            // Toggle Modal
            handleModalOpen();
        }
    };

    const handleInputChange = e => {
        setReservation({
            ...reservation,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <form className={styles.form} onSubmit={handleReservation}>
                <h2 className={styles.title}>Reservation</h2>
                <label>
                    Guests
                    <input
                        type='number'
                        min='1'
                        max={max_reservations}
                        required
                        name='number_of_guests'
                        value={reservation.number_of_guests}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Name
                    <input
                        type='text'
                        required
                        name='contact_name'
                        value={reservation.contact_name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Phone
                    <input
                        type='tel'
                        required
                        name='contact_phonenumber'
                        value={reservation.contact_phonenumber}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Email
                    <input
                        type='email'
                        required
                        name='contact_email'
                        value={reservation.contact_email}
                        onChange={handleInputChange}
                    />
                </label>
                <Button text={'Book Meal'} />
            </form>

            <Modal text={'Reservation'} />
        </>
    );
}
