import { getUrlParam } from './data';

export const getAuthHeaders = () =>
({
	'Authorization': 'Bearer ' + getAccessToken(),
	'Content-type': 'application/json'
});

export const getAccessToken = () => localStorage.getItem('accessToken');

export const saveAccessToken = () => {
	const url = window.location.href;
	const accessToken = getUrlParam(url, 'accessToken');
	localStorage.setItem('accessToken', accessToken);
}

export const isLoginRequired = statusCode => {
	const forbiddenCodes = [401, 403];
	return forbiddenCodes.includes(statusCode)
}
