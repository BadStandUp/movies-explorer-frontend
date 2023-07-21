import {Navigate} from 'react-router';

export default function ProtectedRoute({ children }) {

	if (localStorage.getItem('jwt')) {
		return <Navigate to='/' />;
	}
	return children;
}
