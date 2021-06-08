
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../ducks/auth';
import Login from './Login';

export const withAuth = Component => {
	const Authenticate = props => {
		const { authenticated } = useSelector(state => ({
			authenticated: state.auth.user.authenticated
		}));
		const dispatch = useDispatch();

		useEffect(() => {
			if (!authenticated) {
				fetchUserDetails()(dispatch);
			}
		}, [authenticated]);

		return (
			authenticated ?
				<Component {...props} />
				:
				<Login />
		);
	}
	return Authenticate;
}