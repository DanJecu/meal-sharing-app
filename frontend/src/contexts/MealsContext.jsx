import React, { createContext, useEffect, useMemo, useReducer } from 'react';

export const MealsContext = createContext();

const initialState = {
    meals: [],
    searchQuery: '',
    isModalOpen: false,
    isLoading: true,
};

const actionTypes = {
    SET_MEALS: 'SET_MEALS',
    SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
    SET_IS_MODAL_OPEN: 'SET_IS_MODAL_OPEN',
    SET_IS_LOADING: 'SET_IS_LOADING',
};

const mealsReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_MEALS:
            return { ...state, meals: action.payload };
        case actionTypes.SET_SEARCH_QUERY:
            return { ...state, searchQuery: action.payload };
        case actionTypes.SET_IS_MODAL_OPEN:
            return { ...state, isModalOpen: action.payload };
        case actionTypes.SET_IS_LOADING:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};

const fetchMeals = async (dispatch, searchQuery) => {
    let res;
    try {
        const url = searchQuery
            ? `${import.meta.env.VITE_APP_URL}/api/meals?title=${searchQuery}`
            : `${import.meta.env.VITE_APP_URL}/api/meals`;

        res = await fetch(url);
    } catch (error) {
        throw new Error(error.message);
    }
    if (res.ok) {
        const json = await res.json();
        dispatch({ type: actionTypes.SET_MEALS, payload: json });
        dispatch({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

export const MealsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(mealsReducer, initialState);

    useEffect(() => {
        fetchMeals(dispatch, state.searchQuery); // Fetch on Mount
    }, []);

    useEffect(() => {
        fetchMeals(dispatch, state.searchQuery); // Fetch on search
    }, [state.searchQuery]);

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
        () => ({ ...state, dispatch, handleModalOpen, actionTypes }),
        [state]
    );

    return (
        <MealsContext.Provider value={mealsContextValue}>
            {children}
        </MealsContext.Provider>
    );
};
