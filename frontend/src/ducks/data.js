import config from '../config';
import { processError, processResponse } from '../ducks/auth';

// Actions

const SET_LOADING = 'SET_LOADING';
const ADD_CATEGORIES = 'ADD_CATEGORIES';
const REMOVE_CATEGORIES = 'REMOVE_CATEGORIES';
const SET_PRODUCTS = 'SET_PRODUCTS';
const ADD_PARENT_CATEGORY = 'ADD_PARENT_CATEGORY';
const REMOVE_PARENT_CATEGORY = 'REMOVE_PARENT_CATEGORY';

// Reducer

const initialState = {
    loading: false,
    categoriesStack: [],
    parentCategoryStack: [],
    products: [],
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
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.products
            }
        case ADD_PARENT_CATEGORY:
            return {
                ...state,
                parentCategoryStack: [...state.parentCategoryStack, action.category]
            }
        case REMOVE_PARENT_CATEGORY:
            return {
                ...state,
                parentCategoryStack: state.parentCategoryStack.slice(0, -1)
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
const actionSetProducts = products => ({ type: SET_PRODUCTS, products });
const actionAddParentCategory = category => ({ type: ADD_PARENT_CATEGORY, category });
const actioRemoveParentCategory = () => ({ type: REMOVE_PARENT_CATEGORY });


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

export const addParentCategory = category =>
    dispatch => Promise.resolve(dispatch(actionAddParentCategory(category)));

export const removeParentCategory = () =>
    dispatch => Promise.resolve(dispatch(actioRemoveParentCategory()));

export const fetchProducts = (categoryId) =>
    dispatch => {
        return fetch(`${config.API_URL}/products` + (categoryId ? `/${categoryId}` : ''))
            .then(response => processResponse(response)(dispatch))
            .then(products => {
                if (products) {
                    dispatch(actionSetProducts(products));
                }
                return products;
            })
            .catch(error => processError(error)(dispatch));
    }
