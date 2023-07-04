import {NavLink} from "react-router-dom";
import './Navigation.css';
import account_icon from '../../images/account_icon.svg';

export default function Navigation({ loggedIn }) {
	const menuToggle = () => {
		document.querySelector('.mobile-nav').classList.toggle('mobile-nav__active');
		document.querySelector('.overlay').classList.toggle('overlay_active');
	}

	const linkClick = () => {
		document.querySelector('.mobile-nav').classList.remove('mobile-nav__active');
		document.querySelector('.overlay').classList.remove('overlay_active');
	}

	return (
		<nav className='navigation'>
			<div className='navigation__container'>
				{!loggedIn && <div className='navigation__auth'>
					<NavLink to='/signup' className='navigation__link navigation__link_auth '>Регистрация</NavLink>
					<NavLink to='/signin'
							 className='navigation__link navigation__link_auth navigation__link_button'>Войти</NavLink>
				</div>}
				{loggedIn && <div className='navigation__bar'>
					<NavLink to='/movies'
							 className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}>Фильмы</NavLink>
					<NavLink to='/saved-movies'
							 className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}>Сохранённые
						фильмы</NavLink>
					<NavLink to='/profile'
							 className={({isActive}) => `navigation__link-account ${isActive ? "navigation__link-account_active" : ""}`}>
						<p className='navigation__account-text'>Аккаунт</p>
						<img src={account_icon} alt="Аккаунт" className='navigation__account-icon'/>
					</NavLink>
				</div>}
			</div>
			<button className='burger-menu' onClick={menuToggle}></button>
			<div className="mobile-nav">
				<div className="mobile-nav__container">
					<button className='mobile-nav__quit-button' onClick={menuToggle}></button>
					{!loggedIn && <div className='mobile-nav__auth'>
						<NavLink to='/' onClick={linkClick}
								 className={({isActive}) => `mobile-nav__link ${isActive ? "mobile-nav__link_active" : ""}`}>Главная</NavLink>
						<NavLink to='/signup' onClick={linkClick}
								 className={({isActive}) => `mobile-nav__link ${isActive ? "mobile-nav__link_active" : ""}`}>Регистрация</NavLink>
						<NavLink to='/signin' onClick={linkClick}
								 className={({isActive}) => `mobile-nav__link ${isActive ? "mobile-nav__link_active" : ""}`}>Войти</NavLink>
					</div>}
					{loggedIn && <div className='mobile-nav__bar'>
						<NavLink to='/' onClick={linkClick}
								 className={({isActive}) => `mobile-nav__link ${isActive ? "mobile-nav__link_active" : ""}`}>Главная</NavLink>
						<NavLink to='/movies' onClick={linkClick}
								 className={({isActive}) => `mobile-nav__link ${isActive ? "mobile-nav__link_active" : ""}`}>Фильмы</NavLink>
						<NavLink to='/saved-movies' onClick={linkClick}
								 className={({isActive}) => `mobile-nav__link ${isActive ? "mobile-nav__link_active" : ""}`}>Сохранённые
							фильмы</NavLink>
						<NavLink to='/profile' onClick={linkClick}
								 className={({isActive}) => `mobile-nav__link-account ${isActive ? "mobile-nav__link-account_active" : ""}`}>
							<p className='mobile-nav__account-text'>Аккаунт</p>
							<img src={account_icon} alt="Аккаунт" className='mobile-nav__account-icon'/>
						</NavLink>
					</div>}
				</div>
			</div>
			<div className='overlay' onClick={menuToggle}></div>
		</nav>
	)}
