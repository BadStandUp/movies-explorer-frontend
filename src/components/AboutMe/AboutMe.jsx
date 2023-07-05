import Portfolio from "../Portfolio/Portfolio";
import './AboutMe.css';
import author from '../../images/author.jpg'

export default function AboutMe() {
	return (
		<section className='about-me' id='about-me'>
			<h2 className='about-me__heading'>Студент</h2>
			<div className='about-me__container'>
				<div className='about-me__description'>
					<h3 className='about-me__name'>Семён</h3>
					<p className='about-me__about'>Фронтенд-разработчик, 23 года</p>
					<p className='about-me__paragraph'>С другой стороны постоянный количественный рост и сфера нашей активности требуют определения и уточнения направлений прогрессивного развития. Не следует, однако забывать, что дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание соответствующий условий активизации.</p>
					<a href="https://github.com/BadStandUp" className='about-me__link' rel='nofollow noopener noreferrer' target='_blank'>Github</a>
				</div>
				<img src={author} alt="Фото" className='about-me__image'/>
			</div>
			<Portfolio />
		</section>
	)
}