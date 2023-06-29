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
							className='register__form-input'
						/>
					</label>
					<label className='register__form-label'>
						<span className='register__form-text'>E-mail</span>
						<input
							type="email"
							name="email"
							className='register__form-input'
						/>
					</label>
					<label className='register__form-label'>
						<span className='register__form-text'>Пароль</span>
						<input
							type="password"
							name="password"
							className='register__form-input'
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