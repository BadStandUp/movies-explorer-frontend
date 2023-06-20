import {NavLink} from "react-router-dom";
import './Navigation.css';
import account_icon from '../../images/account_icon.svg';

export default function Navigation() {
	return (
		<nav className='navigation'>
			<div className='navigation__auth'>
				<NavLink to='/signup' className='navigation__link navigation__link_auth '>Регистрация</NavLink>
				<NavLink to='/signin' className='navigation__link navigation__link_auth navigation__link_button'>Войти</NavLink>
			</div>
			<div className='navigation__bar'>
				<NavLink to='/movies' className='navigation__link navigation__link_active'>Фильмы</NavLink>
				<NavLink to='/saved-movies' className='navigation__link'>Сохранённые фильмы</NavLink>
				<NavLink to='/profile' className='navigation__link'>
					<p className='navigation__link'>Аккаунт</p>
					<img src={account_icon} alt="Аккаунт" className='navigation__account-icon'/>
				</NavLink>
			</div>

		</nav>
	)
}
