import {NavLink} from "react-router-dom";
import logo from "../../images/logo.svg";
import './Register.css';
export default function Register() {
	return (
		<main className='register'>
			<div className='register__container'>
				<NavLink to='/' className='register__logo-link'>
					<img src={logo} alt="Лого" className='register__logo'/>
				</NavLink>
				<h1 className='register__heading'>Добро пожаловать!</h1>
				<form className='register__form'>
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
						/>
					</label>
					<span className='register__form-error'>Что-то пошло не так...</span>
					<button type="submit" className='register__form-submit'>Зарегистрироваться</button>
				</form>
				<p className='register__text'>Уже зарегистрированы?<NavLink to='/signin' className='register__link'> Войти</NavLink></p>
			</div>
		</main>
	)
}