import './Profile.css';
import Header from "../../components/Header/Header";
import {useCallback, useContext, useState} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import * as authApi from '../../utils/AuthApi';
import { isEmail } from 'validator';

export default function Profile({handleLogout}) {
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

	const [editedName, setEditedName] = useState(currentUser?.name || '');
	const [editedEmail, setEditedEmail] = useState(currentUser?.email || '');
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState('');

	const handleNameChange = useCallback((e) => {
		setEditedName(e.target.value);
		if (e.target.value.trim() === '') {
			setError('Поле должно быть заполнено');
		} else {
			setError('');
		}
	}, []);

	const handleEmailChange = useCallback((e) => {
		setEditedEmail(e.target.value);
		if (e.target.value.trim() === '') {
			setError('Поле должно быть заполнено');
		} else if (!isEmail(e.target.value)) {
			setError('Некорректный формат электронной почты');
		} else {
			setError('');
		}
	}, []);

	const isFormValid = !!(editedName && editedEmail && !error);

	const toggleEdit = () => {
		setIsEditing(!isEditing);
	};

	const handleProfileUpdate = async () => {
		try {
			await authApi.updateProfile(editedName, editedEmail);
			setCurrentUser({ ...currentUser, name: editedName, email: editedEmail });
			setIsEditing(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Header />
			<main className='profile'>
				<div className='profile__container'>
					<h1 className='profile__heading'>Привет, User!</h1>
					<div className='profile__account'>
						<div className='profile__account-container'>
							<p className='profile__account-heading'>Имя</p>
							{isEditing ? (
								<input
									type='text'
									className='profile__account-info-input'
									value={editedName}
									onChange={handleNameChange}
								/>
							) : (
								<p className='profile__account-info'>{currentUser?.name}</p>
							)}
						</div>
						<div className='profile__account-container'>
							<p className='profile__account-heading'>E-mail</p>
							{isEditing ? (
									<input
										type='email'
										className='profile__account-info-input'
										value={editedEmail}
										onChange={handleEmailChange}
									/>
							) : (
								<p className='profile__account-info'>{currentUser?.email}</p>
							)}
						</div>
						{error && <span className='profile__form-error'>{error}</span>}
					</div>
					{isEditing ? (
						<button
							type='button'
							className={`profile__submit ${!isFormValid ? 'profile__submit_disabled' : ''}`}
							onClick={handleProfileUpdate}
							disabled={!isFormValid}
						>Сохранить</button>
					) : (
						<>
							<button type='button' className='profile__edit' onClick={toggleEdit}>Редактировать</button>
							<button type='button' className='profile__quit' onClick={handleLogout}>Выйти из аккаунта</button>
						</>
					)}
				</div>
			</main>
		</>
	);
}