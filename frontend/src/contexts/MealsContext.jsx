import React, { createContext, useEffect, useMemo, useReducer } from 'react';

export const MealsContext = createContext();

const initialState = {
    meals: [],
    searchQuery: '',
    sortKey: 'price',
    sortDir: 'asc',
    isModalOpen: false,
    isLoading: true,
};

const actionTypes = {
    SET_MEALS: 'SET_MEALS',
    SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
    SET_SORT_KEY: 'SET_SORT_KEY',
    SET_SORT_DIR: 'SET_SORT_DIR',
    SET_IS_MODAL_OPEN: 'SET_IS_MODAL_OPEN',
    SET_IS_LOADING: 'SET_IS_LOADING',
};

const mealsReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_MEALS:
            return { ...state, meals: action.payload };
        case actionTypes.SET_SEARCH_QUERY:
            return { ...state, searchQuery: action.payload };
        case actionTypes.SET_SORT_KEY:
            return { ...state, sortKey: action.payload };
        case actionTypes.SET_SORT_DIR:
            return { ...state, sortDir: action.payload };
        case actionTypes.SET_IS_MODAL_OPEN:
            return { ...state, isModalOpen: action.payload };
        case actionTypes.SET_IS_LOADING:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};

const fetchMeals = async (dispatch, searchQuery, sortKey, sortDir) => {
    let res;
    try {
        const url = searchQuery
            ? `${
                  import.meta.env.VITE_APP_URL
              }/api/meals?title=${searchQuery}&sortKey=${sortKey}&sortDir=${sortDir}`
            : `${
                  import.meta.env.VITE_APP_URL
              }/api/meals?sortKey=${sortKey}&sortDir=${sortDir}`;

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
        fetchMeals(dispatch, state.searchQuery, state.sortKey, state.sortDir); // Fetch on Mount
    }, [state.sortKey, state.sortDir]);

    useEffect(() => {
        fetchMeals(dispatch, state.searchQuery, state.sortKey, state.sortDir); // Fetch on search
    }, [state.searchQuery, state.sortKey, state.sortDir]);

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
