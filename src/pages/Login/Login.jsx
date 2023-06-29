import {NavLink} from "react-router-dom";
import logo from "../../images/logo.svg";
import './Login.css';
export default function Login() {
	return (
		<main className='login'>
			<div className='login__container'>
				<NavLink to='/' className='login__logo-link'>
					<img src={logo} alt="Лого" className='login__logo'/>
				</NavLink>
				<h1 className='login__heading'>Рады видеть!</h1>
				<form className='login__form'>
					<label className='login__form-label'>
						<span className='login__form-text'>E-mail</span>
						<input
							type="email"
							name="email"
							className='login__form-input'
						/>
					</label>
					<label className='login__form-label'>
						<span className='login__form-text'>Пароль</span>
						<input
							type="password"
							name="password"
							className='login__form-input'
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