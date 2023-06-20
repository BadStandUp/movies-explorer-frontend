import './Portfolio.css';

export default function Portfolio() {
	return (
		<div className='portfolio'>
			<h4  className='portfolio__heading'>Портфолио</h4>
			<a href='#' className='portfolio__link'>
				<span>Статичный сайт</span>
				<span>&#8599;</span>
			</a>
			<a href='#' className='portfolio__link'>
				<span>Адаптивный сайт</span>
				<span>&#8599;</span>
			</a>
			<a href='#' className='portfolio__link'>
				<span>Одностраничное приложение</span>
				<span>&#8599;</span>
			</a>
		</div>
	)
}