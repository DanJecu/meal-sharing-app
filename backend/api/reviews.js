const express = require('express');
const router = express.Router();
const knex = require('../database');

router.get('/', async (request, response) => {
    try {
        const reviews = await knex.select().from('reviews');

        response.json(reviews);
    } catch (error) {
        response.json({ error: error.message });
    }
});

router.post('/', async (request, response) => {
    try {
        const newReview = request.body;

        await knex.insert(newReview).into('reviews');

        response.status(201).send({ message: 'Review created!' });
    } catch (error) {
        response.status(500).send({ error: 'Server error' });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const reviewId = request.params.id;
        const review = await knex
            .select()
            .from('reviews')
            .where({ meal_id: reviewId });
        review.length
            ? response.send(review)
            : response.send({
                  message: 'There is no review with this id.',
              });
    } catch (error) {
        response.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', async (request, response) => {
    try {
        const reviewId = request.params.id;
        const reviewBody = request.body;

        const review = await knex
            .select()
            .from('reviews')
            .where({ id: reviewId });

        if (review.length) {
            await knex('reviews').where({ id: reviewId }).update(reviewBody);
            const updatedReview = await knex('reviews').where({
                id: reviewId,
            });

            response.send([{ message: 'Review Updated!' }, updatedReview]);
        } else {
            response.status(400).send({ message: 'Review cannot be updated' });
        }
    } catch (error) {
        response.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const reviewId = request.params.id;
        const review = await knex('reviews').where({
            id: reviewId,
        });

        if (review.length) {
            await knex('reviews').where({ id: reviewId }).del();

            response.send({ message: 'Reservation Deleted!' });
        } else {
            response.send({ message: 'There is no reservation with this id.' });
        }
    } catch (error) {
        response.status(500).send({ error: 'Server error' });
    }
});

module.exports = router;
