import './Portfolio.css';

export default function Portfolio() {
	return (
		<section className='portfolio'>
			<h4  className='portfolio__heading'>Портфолио</h4>
			<a href='https://github.com/BadStandUp/how-to-learn' className='portfolio__link' rel='nofollow noopener noreferrer' target='_blank'>
				<span>Статичный сайт</span>
				<span>&#8599;</span>
			</a>
			<a href='https://github.com/BadStandUp/russian-travel' className='portfolio__link' rel='nofollow noopener noreferrer' target='_blank'>
				<span>Адаптивный сайт</span>
				<span>&#8599;</span>
			</a>
			<a href='https://github.com/BadStandUp/react-mesto-auth' className='portfolio__link' rel='nofollow noopener noreferrer' target='_blank'>
				<span>Одностраничное приложение</span>
				<span>&#8599;</span>
			</a>
		</section>
	)
}