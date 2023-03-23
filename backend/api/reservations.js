const express = require('express');
const router = express.Router();
const knex = require('../database');

router.get('/', async (request, response) => {
    try {
        const reservations = await knex.select().from('reservations');

        response.json(reservations);
    } catch (error) {
        response.json({ error: error.message });
    }
});

router.post('/', async (request, response) => {
    try {
        const newReservation = request.body;

        await knex.insert(newReservation).into('reservations');

        response.status(201).json({ message: 'Reservation created!' });
    } catch (error) {
        response.status(500).json({ error: 'Server error' });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const reservationId = request.params.id;
        const reservation = await knex
            .select()
            .from('reservations')
            .where({ meal_id: reservationId });
        reservation.length
            ? response.json(reservation)
            : response.json({
                  message: 'There is no reservation with this id.',
              });
    } catch (error) {
        response.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', async (request, response) => {
    try {
        const reservationId = request.params.id;
        const reservationBody = request.body;

        const reservation = await knex
            .select()
            .from('reservations')
            .where({ id: reservationId });

        if (reservation.length) {
            await knex('reservations')
                .where({ id: reservationId })
                .update(reservationBody);
            const updatedReservation = await knex('reservations').where({
                id: reservationId,
            });

            response.json([
                { message: 'Reservation Updated!' },
                updatedReservation,
            ]);
        } else {
            response
                .status(400)
                .json({ message: 'Reservation cannot be updated' });
        }
    } catch (error) {
        response.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const reservationId = request.params.id;
        const reservation = await knex('reservations').where({
            id: reservationId,
        });

        if (reservation.length) {
            await knex('reservations').where({ id: reservationId }).del();

            response.json({ message: 'Reservation Deleted!' });
        } else {
            response.json({ message: 'There is no reservation with this id.' });
        }
    } catch (error) {
        response.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
