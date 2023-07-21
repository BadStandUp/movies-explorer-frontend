import {  Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const GuestRoute = ({ children }) => {
	const { loggedIn } = useContext(AuthContext);

	if (loggedIn) {
		return <Navigate to='/' />;
	}
	return children;
}