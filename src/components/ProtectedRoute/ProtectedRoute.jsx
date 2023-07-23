import {Navigate} from 'react-router';

export default function ProtectedRoute({ children }) {

	if (!localStorage.getItem('token')) {
		return <Navigate to='/' />;
	}
	return children;
}
