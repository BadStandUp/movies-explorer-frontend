import {NavLink} from "react-router-dom";
import logo from "../../images/logo.svg";
import './Register.css';
import {useCallback, useState} from 'react';
import { isEmail } from 'validator';

export default function Register({ handleRegisterSubmit }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [error, setError] = useState('');

	const handleNameChange = useCallback((e) => {
		setName(e.target.value);
		if (e.target.value.trim() === '') {
			setError('Поле должно быть заполнено');
		} else {
			setError('');
		}
	}, []);

	const handleEmailChange = useCallback((e) => {
		setEmail(e.target.value);
		if (e.target.value.trim() === '') {
			setError('Поле должно быть заполнено');
		} else if (!isEmail(e.target.value)) {
			setError('Некорректный формат электронной почты');
		} else {
			setError('');
		}
	}, []);

	const handlePasswordChange = useCallback((e) => {
		setPassword(e.target.value);
		if (e.target.value.trim() === '') {
			setError('Поле должно быть заполнено');
		} else if (e.target.value.length < 8) {
			setError('Не менее 8 символов');
		} else {
			setError('');
		}
	}, []);

	const isFormValid = !!(name && email && password && !error);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isFormValid) {
			handleRegisterSubmit(name, email, password);
		}
	};

	return (
		<main className='register'>
			<div className='register__container'>
				<NavLink to='/' className='register__logo-link'>
					<img src={logo} alt="Лого" className='register__logo'/>
				</NavLink>
				<h1 className='register__heading'>Добро пожаловать!</h1>
				<form className='register__form' onSubmit={handleSubmit} name='registerForm'>
					<label className='register__form-label'>
						<span className='register__form-text'>Имя</span>
						<input
							type="text"
							name="name"
							placeholder=' '
							className='register__form-input'
							required
							minLength='2'
							maxLength='30'
							aria-label='Имя'
							autoComplete='first-name'
							value={name}
							onChange={handleNameChange}
						/>
					</label>
					<label className='register__form-label'>
						<span className='register__form-text'>E-mail</span>
						<input
							type="email"
							name="email"
							placeholder=' '
							className='register__form-input'
							required
							minLength='2'
							maxLength='30'
							aria-label='E-mail'
							autoComplete='username'
							value={email}
							onChange={handleEmailChange}
						/>
					</label>
					<label className='register__form-label'>
						<span className='register__form-text'>Пароль</span>
						<input
							type="password"
							name="password"
							placeholder=' '
							className='register__form-input'
							required
							minLength='8'
							maxLength='30'
							aria-label='Пароль'
							autoComplete='new-password'
							value={password}
							onChange={handlePasswordChange}
						/>
					</label>
					<span className='register__form-error'>{error}</span>
					<button
						type="submit"
						className={`register__form-submit ${!isFormValid ? 'register__form-submit_disabled' : ''}`}
						disabled={!isFormValid}
					>
						Зарегистрироваться
					</button>
				</form>
				<p className='register__text'>Уже зарегистрированы?<NavLink to='/signin' className='register__link'> Войти</NavLink></p>
			</div>
		</main>
	)
}