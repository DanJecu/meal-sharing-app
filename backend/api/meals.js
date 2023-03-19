const { request } = require('express');
const express = require('express');
const router = express.Router();
const knex = require('../database');

router.get('/', async (request, response) => {
    let filteredMeals = knex('meals').select('*');

    if (request.query.maxPrice) {
        filteredMeals = filteredMeals.where(
            'price',
            '<=',
            request.query.maxPrice
        );
    }

    if (
        request.query.availableReservations &&
        (request.query.availableReservations === 'true' ||
            request.query.availableReservations === 'false')
    ) {
        const comparison =
            request.query.availableReservations === 'true' ? '>=' : '<';
        filteredMeals = filteredMeals
            .join('reservations', 'reservations.meal_id', '=', 'meals.id')
            .whereRaw(
                `meals.max_reservations ${comparison} reservations.number_of_guests`
            )
            .groupBy('meals.id', 'meals.title', 'reservations.id');
    }

    if (request.query.title) {
        filteredMeals = filteredMeals.where(
            'title',
            'ilike',
            `%${request.query.title}%`
        );
    }

    if (request.query.dateAfter) {
        filteredMeals = filteredMeals.where(
            'when',
            '>',
            request.query.dateAfter
        );
    }
    if (request.query.dateBefore) {
        filteredMeals = filteredMeals.where(
            'when',
            '<',
            request.query.dateBefore
        );
    }

    if (request.query.limit) {
        filteredMeals = filteredMeals.limit(request.query.limit);
    }

    if (
        request.query.sortKey &&
        (request.query.sortKey === 'when' ||
            request.query.sortKey === 'max_reservations' ||
            request.query.sortKey === 'price')
    ) {
        if (
            request.query.sortDir &&
            (request.query.sortDir === 'asc' ||
                request.query.sortDir === 'desc')
        )
            filteredMeals = filteredMeals.orderBy(
                request.query.sortKey,
                request.query.sortDir
            );
        else {
            filteredMeals = filteredMeals.orderBy(request.query.sortKey);
        }
    }

    try {
        const meals = await filteredMeals;

        if (meals.length) {
            response.json(meals);
        } else response.json({ message: 'No meals found!' });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

router.post('/', async (request, response) => {
    try {
        const newMeal = request.body;

        await knex.insert(newMeal).into('meals');

        response.status(201).json({ message: 'Meal created!' });
    } catch (error) {
        response.status(500).json({ error: 'Server error' });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const mealId = request.params.id;

        const meal = await knex.select().from('meals').where({ id: mealId });

        meal.length
            ? response.json(meal)
            : response.json({ message: 'There is no meal with this id.' });
    } catch (error) {
        response.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', async (request, response) => {
    try {
        const mealId = request.params.id;
        const mealBody = request.body;

        const meal = await knex.select().from('meals').where({ id: mealId });

        if (meal.length) {
            await knex('meals').where({ id: mealId }).update(mealBody);
            const updatedMeal = await knex('meals').where({ id: mealId });

            response.json([{ message: 'Meal Updated!' }, updatedMeal]);
        } else {
            response.status(400).json({ message: 'Meal cannot be updated' });
        }
    } catch (error) {
        response.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const mealId = request.params.id;
        const meal = await knex('meals').where({ id: mealId });

        if (meal.length) {
            await knex('meals').where({ id: mealId }).del();

            response.json({ message: 'Meal Deleted!' });
        } else {
            response.json({ message: 'There is no meal with this id.' });
        }
    } catch (error) {
        response.status(500).json({ error: 'Server error' });
    }
});

router.get('/:meal_id/reviews', async (request, response) => {
    try {
        if (request.params.meal_id) {
            const reviews = await knex('meals')
                .select('*')
                .join('reviews', 'reviews.meal_id', '=', 'meals.id')
                .where('meal_id', '=', request.params.meal_id);

            response.json(reviews);
        } else response.json('No review for this meal.');
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

module.exports = router;
