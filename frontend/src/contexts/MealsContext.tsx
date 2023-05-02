import React, {
    createContext,
    useEffect,
    useMemo,
    useReducer,
    PropsWithChildren,
} from 'react';

type ActionTypes =
    | 'SET_MEALS'
    | 'SET_SEARCH_QUERY'
    | 'SET_SORT_KEY'
    | 'SET_SORT_DIR'
    | 'SET_IS_MODAL_OPEN'
    | 'SET_IS_LOADING';

type Action<T extends ActionTypes, P> = {
    type: T;
    payload: P;
};

type Meal = {
    id: number;
    title: string;
    description: string;
    price: number;
    max_reservations: number;
};

type MealsState = {
    meals: Meal[];
    searchQuery: string;
    sortKey: string;
    sortDir: string;
    isModalOpen: boolean;
    isLoading: boolean;
};

type MealsContextType = {
    meals: Meal[];
    searchQuery: string;
    sortKey: string;
    sortDir: string;
    isModalOpen: boolean;
    isLoading: boolean;
    dispatch: React.Dispatch<Action<ActionTypes, any>>;
    handleModalOpen: () => void;
};

const initialState: MealsState = {
    meals: [],
    searchQuery: '',
    sortKey: 'price',
    sortDir: 'asc',
    isModalOpen: false,
    isLoading: true,
};

export const MealsContext = createContext<MealsContextType>(
    {} as MealsContextType
);

export const actionTypes: { [key in ActionTypes]: key } = {
    SET_MEALS: 'SET_MEALS',
    SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
    SET_SORT_KEY: 'SET_SORT_KEY',
    SET_SORT_DIR: 'SET_SORT_DIR',
    SET_IS_MODAL_OPEN: 'SET_IS_MODAL_OPEN',
    SET_IS_LOADING: 'SET_IS_LOADING',
};

const mealsReducer = (state: MealsState, action: Action<ActionTypes, any>) => {
    switch (action.type) {
        case actionTypes.SET_MEALS:
            return { ...state, meals: action.payload as Meal[] };
        case actionTypes.SET_SEARCH_QUERY:
            return { ...state, searchQuery: action.payload as string };
        case actionTypes.SET_SORT_KEY:
            return { ...state, sortKey: action.payload as string };
        case actionTypes.SET_SORT_DIR:
            return { ...state, sortDir: action.payload as string };
        case actionTypes.SET_IS_MODAL_OPEN:
            return { ...state, isModalOpen: action.payload as boolean };
        case actionTypes.SET_IS_LOADING:
            return { ...state, isLoading: action.payload as boolean };
        default:
            return state;
    }
};

const fetchMeals = async (
    dispatch: React.Dispatch<Action<ActionTypes, any>>,
    searchQuery: string,
    sortKey: string,
    sortDir: string
) => {
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
        if (typeof error === 'string') {
            throw new Error(error);
        }
        throw new Error('An error occurred while fetching meals.');
    }
    if (res.ok) {
        const json = await res.json();
        dispatch({ type: actionTypes.SET_MEALS, payload: json });
        dispatch({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

export const MealsProvider: React.FC = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(mealsReducer, initialState);

    useEffect(() => {
        fetchMeals(dispatch, state.searchQuery, state.sortKey, state.sortDir);
    }, [state.sortKey, state.sortDir, state.searchQuery]);

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
        [state, dispatch, handleModalOpen, actionTypes]
    );

    return (
        <MealsContext.Provider value={mealsContextValue}>
            {children}
        </MealsContext.Provider>
    );
};
