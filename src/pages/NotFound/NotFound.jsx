import {NavLink} from "react-router-dom";
import './NotFound.css';

export default function NotFound() {
	return (
		<div className='not-found'>
			<h1 className='not-found__heading'>404</h1>
			<p className='not-found__text'>Страница не найдена</p>
			<NavLink to='/' className='not-found__quit'>Назад</NavLink>
		</div>
	)
}