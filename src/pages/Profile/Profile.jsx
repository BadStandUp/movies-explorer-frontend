import './Profile.css';
import Header from "../../components/Header/Header";
import {NavLink, useNavigate} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';

export default function Profile(props) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const navigate = useNavigate();

	const user = useContext(CurrentUserContext);

	useEffect(() => {
		setName(user.name);
		setEmail(user.email);
	}, [user]);

	const handleLogout = useCallback(() => {
		localStorage.removeItem('jwt');
		navigate('/', {replace: true});
		props.setLoggedIn(false)
	}, [props, navigate]);

	return (
		<>
			<Header loggedIn={props.loggedIn}/>
			<main className='profile'>
				<div className='profile__container'>
					<h1 className='profile__heading'>Привет, User!</h1>
					<div className='profile__account'>
						<div className='profile__account-container'>
							<p className='profile__account-heading'>Имя</p>
							<p className='profile__account-info'>{name}</p>
						</div>
						<div className='profile__account-container'>
							<p className='profile__account-heading'>E-mail</p>
							<p className='profile__account-info'>{email}</p>
						</div>
					</div>
					<p className='profile__edit'>Редактировать</p>
					<NavLink to='/' className='profile__quit' onClick={handleLogout}>Выйти из аккаунта</NavLink>
				</div>
			</main>
		</>
	)
}