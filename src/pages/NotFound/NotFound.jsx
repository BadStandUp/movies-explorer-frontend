import {NavLink} from "react-router-dom";

export default function NotFound() {
	return (
		<div>
			<h1>404</h1>
			<p>Страница не найдена</p>
			<NavLink to='/' className=''>Назад</NavLink>
		</div>
	)
}