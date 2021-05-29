import config from '../config';
import { processError, processResponse } from '../ducks/auth';

// Actions

const SET_LOADING = 'SET_LOADING';
const ADD_CATEGORIES = 'ADD_CATEGORIES';
const REMOVE_CATEGORIES = 'REMOVE_CATEGORIES';

// Reducer

const initialState = {
    loading: false,
    categoriesStack: [],
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case ADD_CATEGORIES:
            return {
                ...state,
                categoriesStack: [...state.categoriesStack, action.categories]
            }
        case REMOVE_CATEGORIES:
            return {
                ...state,
                categoriesStack: state.categoriesStack.slice(0, -1)
            }
        default:
            return state;
    }
}
export default reducer;

// Action Creators

const actionSetLoading = loading => ({ type: SET_LOADING, loading });
const actionAddCategories = categories => ({ type: ADD_CATEGORIES, categories });
const actioRemoveCategories = () => ({ type: REMOVE_CATEGORIES });


// Methods

export const setLoading = loading =>
    dispatch => dispatch(actionSetLoading(loading));

export const addCategories = categories =>
    dispatch => dispatch(actionAddCategories(categories));

export const removeCategories = () =>
    dispatch => dispatch(actioRemoveCategories());

export const fetchCategories = () =>
    dispatch => {
        return fetch(`${config.API_URL}/categories/main-categories`)
            .then(response => processResponse(response)(dispatch))
            .then(categories => {
                if (categories) {
                    dispatch(actionAddCategories(categories));
                }
                return categories;
            })
            .catch(error => processError(error)(dispatch));
    }
