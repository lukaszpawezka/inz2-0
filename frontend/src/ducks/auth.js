import { message } from 'antd';
import config from '../config';
import { isLoginRequired } from '../utils/auth';
import { clear } from '../utils/data';

// Actions

const SET_USER_DETAILS = 'SET_USER_DETAILS';
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

// Reducer

const initialState = {
	user: {
		authenticated: false,
		details: null
	}
}

const reducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case SET_USER_DETAILS:
			return {
				...state,
				user: {
					...state.user,
					details: action.userDetails
				}
			}

		case LOGIN:
			return {
				...state,
				user: {
					...state.user,
					authenticated: true
				}
			}

		case LOGOUT:
			return {
				...state,
				user: {
					authenticated: false,
					details: null
				}
			}

		default:
			return state;
	}
}
export default reducer;

// Action Creators

const actionSetUserDetails = userDetails => ({ type: SET_USER_DETAILS, userDetails });
const actionLogin = () => ({ type: LOGIN });
const actionLogout = () => ({ type: LOGOUT });

// Methods

export const processResponse = response =>
	dispatch => {
		if (response.ok) {
			return response.json();
		} else if (isLoginRequired(response.status)) {
			if (config.AUTOLOGIN) {
				login()(dispatch);
			} else {
				dispatch(actionLogout());
				clear();
				throw 'Login required!';
			}
		} else {
			return response.json()
				.then(json => {
					throw json;
				});
		}
	}

export const processError = error =>
	dispatch => console.error('Uh oh, an error!', error);

export const fetchUserDetails = () =>
	dispatch => {
		return fetch(`${config.API_URL}/me`)
			.then(response => processResponse(response)(dispatch))
			.then(userDetails => {
				if (userDetails) {
					dispatch(actionSetUserDetails(userDetails));
					dispatch(actionLogin());
				}
				return userDetails;
			})
			.catch(error => processError(error)(dispatch));
	}

export const login = (username, password) =>
	dispatch => {
		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		return fetch('login', {
			method: 'POST',
			body: config.AUTOLOGIN ? null : formData
		})
			.then(response => {
				if (response.ok) {
					fetchUserDetails()(dispatch);
				} else {
					message.error('Podano nieprawidłowy login lub hasło.');
				}
				return response;
			})
			.catch(error => processError(error)(dispatch));
	}

export const logout = () =>
	dispatch => {
		return fetch('logout', {
			method: 'POST'
		})
			.then(() => {
				dispatch(actionLogout());
				clear();
			})
			.catch(error => processError(error)(dispatch));
	}
