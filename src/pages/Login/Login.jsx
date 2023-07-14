import {NavLink} from "react-router-dom";
import logo from "../../images/logo.svg";
import './Login.css';
import {useState, useCallback} from 'react';

export default function Login({handleLoginSubmit}) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		handleLoginSubmit(email, password);
	}

	const handleEmailChange = useCallback((e) => {
		setEmail(e.target.value);
	}, []);

	const handlePasswordChange = useCallback((e) => {
		setPassword(e.target.value);
	}, []);

	return (
		<main className='login'>
			<div className='login__container'>
				<NavLink to='/' className='login__logo-link'>
					<img src={logo} alt="Лого" className='login__logo'/>
				</NavLink>
				<h1 className='login__heading'>Рады видеть!</h1>
				<form className='login__form' onSubmit={handleSubmit}>
					<label className='login__form-label'>
						<span className='login__form-text'>E-mail</span>
						<input
							type="email"
							name="email"
							placeholder=' '
							className='login__form-input'
							required
							minLength='2'
							maxLength='30'
							aria-label='E-mail'
							autoComplete='username'
							value={email || ''}
							onChange={handleEmailChange}
						/>
					</label>
					<label className='login__form-label'>
						<span className='login__form-text'>Пароль</span>
						<input
							type="password"
							name="password"
							placeholder=' '
							className='login__form-input'
							required
							minLength='8'
							maxLength='30'
							aria-label='Пароль'
							autoComplete='current-password'
							value={password || ''}
							onChange={handlePasswordChange}
						/>
					</label>
					<span className='login__form-error'>Что-то пошло не так...</span>
					<button type="submit" className='login__form-submit'>Войти</button>
				</form>
				<p className='login__text'>Ещё не зарегистрированы?<NavLink to='/signup' className='login__link'> Регистрация</NavLink></p>
			</div>
		</main>
	)
}