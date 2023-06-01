import React, { useState, useContext, useEffect, useMemo } from 'react';
import { MealsContext } from '../../contexts/MealsContext';
import {
    renderReservations,
    calculateReservations,
} from '../../../utils/calculateReservations';
import styles from './FormReservation.module.css';

// Components
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

interface Reservation {
    number_of_guests: number;
    contact_name: string;
    contact_phonenumber: string;
    contact_email: string;
    meal_id: number;
    created_date: string;
}

type Props = {
    id: number;
    max_reservations: number;
};

export default function FormReservation({ id, max_reservations }: Props) {
    const initialReservationState: Reservation = {
        number_of_guests: 0,
        contact_name: '',
        contact_phonenumber: '',
        contact_email: '',
        meal_id: id,
        created_date: '',
    };
    const { handleModalOpen } = useContext(MealsContext);

    const [reservation, setReservation] = useState<Reservation>(
        initialReservationState
    );
    // Set number of bookings for meal
    const [bookings, setBookings] = useState(0);

    useEffect(() => {
        (async () => {
            let res;
            try {
                res = await fetch(
                    `${import.meta.env.VITE_APP_URL}/api/reservations/${id}`
                );
            } catch (error: any) {
                throw new Error(error.message);
            }

            if (res.ok) {
                const json = await res.json();
                setBookings(json);
            }
        })();
    }, [bookings, id]);

    const handleReservation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let currentDate = new Date().toLocaleDateString('fr-CA');

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
        } catch (error: any) {
            throw new Error(error.message);
        }
        if (response.ok) {
            const data = await response.json();
            setReservation(initialReservationState);
            // Toggle Modal
            handleModalOpen();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReservation({
            ...reservation,
            [e.target.name]: e.target.value,
        });
    };

    const guests = useMemo(() => {
        if (!Array.isArray(bookings)) {
            return null;
        }

        return calculateReservations(bookings, max_reservations);
    }, [bookings, max_reservations]);

    return (
        <>
            <form className={styles.form} onSubmit={handleReservation}>
                <h2 className={styles.title}>Reservation</h2>
                <span className={styles.spotsLeft}>
                    {guests !== null && renderReservations(guests)}
                </span>
                <label>
                    Guests
                    <input
                        type='number'
                        min='0'
                        max={guests || ''}
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

                <Button
                    text={'Book Meal'}
                    disabled={guests === null || guests <= 0}
                />
            </form>

            <Modal text={'Reservation'} />
        </>
    );
}
