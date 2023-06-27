import Portfolio from "../Portfolio/Portfolio";
import './AboutMe.css';

export default function AboutMe() {
	return (
		<div className='about-me'>
			<h2 className='about-me__heading'>Студент</h2>
			<div className='about-me__container'>
				<div className='about-me__description'>
					<h3 className='about-me__name'>Семён</h3>
					<p className='about-me__about'>Фронтенд-разработчик, 30 лет</p>
					<p className='about-me__paragraph'>С другой стороны постоянный количественный рост и сфера нашей активности требуют определения и уточнения направлений прогрессивного развития. Не следует, однако забывать, что дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание соответствующий условий активизации.</p>
					<a href="#" className='about-me__link'>Github</a>
				</div>
				<img src="" alt="" className='about-me__image'/>
			</div>
			<Portfolio />
		</div>
	)
}