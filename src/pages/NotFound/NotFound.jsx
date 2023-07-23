import { useNavigate } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<div className='not-found'>
			<h1 className='not-found__heading'>404</h1>
			<p className='not-found__text'>Страница не найдена</p>
			<button type='button' className='not-found__quit' onClick={() => navigate(-1)}>Назад</button>
		</div>
	)
}