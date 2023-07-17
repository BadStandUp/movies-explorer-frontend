import {useContext} from 'react';
import {Navigate, Outlet} from 'react-router';
import {AuthContext} from '../../contexts/AuthContext.js';

export default function ProtectedRoute() {
	const { loggedIn } = useContext(AuthContext);

	return (
		loggedIn ? <Outlet /> : <Navigate to='/signin'/>
	)
}