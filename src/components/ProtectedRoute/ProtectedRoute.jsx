import {Navigate, Outlet} from 'react-router';

export default function ProtectedRoute({loggedIn}) {
	return (
		loggedIn ? <Outlet /> : <Navigate to='/signin'/>
	)
}