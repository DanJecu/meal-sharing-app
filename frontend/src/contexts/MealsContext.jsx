import React, { createContext, useEffect, useMemo, useReducer } from 'react';

export const MealsContext = createContext();

const initialState = {
    meals: [],
    searchQuery: '',
    isModalOpen: false,
};

const actionTypes = {
    SET_MEALS: 'SET_MEALS',
    SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
    SET_IS_MODAL_OPEN: 'SET_IS_MODAL_OPEN',
};

const mealsReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_MEALS:
            return { ...state, meals: action.payload };
        case actionTypes.SET_SEARCH_QUERY:
            return { ...state, searchQuery: action.payload };
        case actionTypes.SET_IS_MODAL_OPEN:
            return { ...state, isModalOpen: action.payload };
        default:
            return state;
    }
};

export const MealsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(mealsReducer, initialState);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch('/api/meals');

                const json = await response.json();
                dispatch({ type: actionTypes.SET_MEALS, payload: json });
            } catch (error) {
                throw new Error(error);
            }
        };
        fetchMeals();
    }, []);

    const handleModalOpen = () => {
        dispatch({ type: actionTypes.SET_IS_MODAL_OPEN, payload: true });
    };

    useEffect(() => {
        if (state.isModalOpen) {
            const timerId = setTimeout(() => {
                dispatch({
                    type: actionTypes.SET_IS_MODAL_OPEN,
                    payload: false,
                });
            }, 1000);
            return () => clearTimeout(timerId);
        }
    }, [state.isModalOpen]);

    const mealsContextValue = useMemo(
        () => ({ ...state, dispatch, handleModalOpen }),
        [state]
    );

    return (
        <MealsContext.Provider value={mealsContextValue}>
            {children}
        </MealsContext.Provider>
    );
};
