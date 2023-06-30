import './Profile.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {NavLink} from "react-router-dom";

export default function Profile() {
	return (
		<>
			<Header />
			<main className='profile'>
				<div className='profile__container'>
					<h1 className='profile__heading'>Привет, User!</h1>
					<div className='profile__account'>
						<div className='profile__account-container'>
							<p className='profile__account-heading'>Имя</p>
							<p className='profile__account-info'>User</p>
						</div>
						<div className='profile__account-container'>
							<p className='profile__account-heading'>E-mail</p>
							<p className='profile__account-info'>pochta@yandex.ru</p>
						</div>
					</div>
					<p className='profile__edit'>Редактировать</p>
					<NavLink to='/' className='profile__quit'>Выйти из аккаунта</NavLink>
				</div>
			</main>
			<Footer />
		</>
	)
}