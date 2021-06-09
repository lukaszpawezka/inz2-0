import config from '../config';
import { processError, processResponse } from '../ducks/auth';

// Actions

const SET_LOADING = 'SET_LOADING';
const ADD_CATEGORIES = 'ADD_CATEGORIES';
const REMOVE_CATEGORIES = 'REMOVE_CATEGORIES';
const SET_PRODUCTS = 'SET_PRODUCTS';
const ADD_PARENT_CATEGORY = 'ADD_PARENT_CATEGORY';
const REMOVE_PARENT_CATEGORY = 'REMOVE_PARENT_CATEGORY';
const SET_ORDERS = 'SET_ORDERS'
const ADD_ORDER = 'ADD_ORDER'
const CLEAR_CART = 'CLEAR_CART' // TODO

// Reducer

const initialState = {
    loading: false,
    categoriesStack: [],
    parentCategoryStack: [],
    products: [],
    orders: [],
    myOrders: []
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
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders
            }
        case ADD_ORDER:
            return {
                ...state,
                myOrders: [...state.myOrders, action.order]
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
const actionSetOrders = orders => ({ type: SET_ORDERS, orders });
const actionAddOrder = order => ({ type: ADD_ORDER, order });


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

export const fetchOrders = (productId, my = false) =>
    dispatch => {
        return fetch(`${config.API_URL}/orders` + (my ? '/my' : (productId ? `/product/${productId}` : '')))
            .then(response => processResponse(response)(dispatch))
            .then(orders => {
                if (orders) {
                    dispatch(actionSetOrders(orders));
                }
                return orders;
            })
            .catch(error => processError(error)(dispatch));
    }

export const addOrder = order =>
    dispatch => dispatch(actionAddOrder(order));

export const createOrders = (myOrders) =>
    dispatch => {
        myOrders.forEach(myOrder => {
            fetch(`${config.API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(myOrder)
            })
                .then(response => processResponse(response)(dispatch))
                .catch(error => processError(error)(dispatch));
        });
    }
