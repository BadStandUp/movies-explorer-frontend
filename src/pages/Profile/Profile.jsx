import './Profile.css';
import Header from "../../components/Header/Header";
import {useCallback, useContext, useEffect, useState} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import * as authApi from '../../utils/AuthApi';
import { isEmail } from 'validator';
import Popup from '../../components/UI/Popup/Popup.jsx';

export default function Profile({handleLogout}) {
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

	const [editedName, setEditedName] = useState(currentUser?.name || '');
	const [editedEmail, setEditedEmail] = useState(currentUser?.email || '');
	const [isEditing, setIsEditing] = useState(false);
	const [nameError, setNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [isDataChanged, setIsDataChanged] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState('');

	const checkDataChanged = useCallback(() => {
		const nameChanged = editedName !== currentUser.name;
		const emailChanged = editedEmail !== currentUser.email;
		setIsDataChanged(nameChanged || emailChanged);
	}, [editedName, currentUser.name, editedEmail, currentUser.email]);

	useEffect(() => {
		checkDataChanged();
	}, [checkDataChanged]);

	const handleNameChange = useCallback((e) => {
		setEditedName(e.target.value);
		if (e.target.value.trim() === '') {
			setNameError('Поле должно быть заполнено');
		} else {
			setNameError('');
		}
	}, []);

	const handleEmailChange = useCallback((e) => {
		setEditedEmail(e.target.value);
		if (e.target.value.trim() === '') {
			setEmailError('Поле должно быть заполнено');
		} else if (!isEmail(e.target.value)) {
			setEmailError('Некорректный формат электронной почты');
		} else {
			setEmailError('');
		}
	}, []);

	const isFormValid = isEditing && !!(editedName && editedEmail && !nameError && !emailError);

	const toggleEdit = () => {
		setIsEditing(!isEditing);
		setNameError('');
		setEmailError('');
	};

	const handleProfileUpdate = async () => {
		try {
			await authApi.updateProfile(editedName, editedEmail);
			setCurrentUser({ ...currentUser, name: editedName, email: editedEmail });
			setIsEditing(false);
			setIsDataChanged(false);
			setPopupMessage('Данные обновлены.');
			setShowPopup(true);
			setTimeout(() => {
				setShowPopup(false);
			}, 5000);
		} catch (error) {
			console.error(error);
			setPopupMessage('Ошибка при обновлении данных.');
			setShowPopup(true);
			setTimeout(() => {
				setShowPopup(false);
			}, 5000);
		}
	};

	return (
		<>
			<Header />
			<main className='profile'>
				<div className='profile__container'>
					<h1 className='profile__heading'>Привет, {currentUser?.name}</h1>
					<div className='profile__account'>
						<div className='profile__account-container'>
							<p className='profile__account-heading'>{nameError && <span className='profile__form-error'>{nameError}</span> || 'Имя'}</p>
							{isEditing ? (
								<>
									<input
										type='text'
										className='profile__account-info-input'
										value={editedName}
										onChange={handleNameChange}
									/>
								</>
							) : (
								<p className='profile__account-info'>{currentUser?.name}</p>
							)}
						</div>
						<div className='profile__account-container'>
							<p className='profile__account-heading'>{emailError && <span className='profile__form-error'>{emailError}</span> || 'E-mail'}</p>
							{isEditing ? (
								<>
									<input
										type='email'
										className='profile__account-info-input'
										value={editedEmail}
										onChange={handleEmailChange}
									/>
								</>
							) : (
								<p className='profile__account-info'>{currentUser?.email}</p>
							)}
						</div>
					</div>
					{isEditing ? (
						<button
							type='button'
							className={`profile__submit ${!isFormValid || !isDataChanged ? 'profile__submit_disabled' : ''}`}
							onClick={handleProfileUpdate}
							disabled={!isFormValid || !isDataChanged}
						>
							Сохранить
						</button>
					) : (
						<>
							<button type='button' className='profile__edit' onClick={toggleEdit}>
								Редактировать
							</button>
							<button type='button' className='profile__quit' onClick={handleLogout}>
								Выйти из аккаунта
							</button>
						</>
					)}
				</div>
			</main>
			{showPopup && (
				<Popup message={popupMessage} />
			)}
		</>
	);
}