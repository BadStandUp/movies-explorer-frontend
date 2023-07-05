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
					<p className='about-me__paragraph'>Я – фронтендерский клоун, играющий со светом и тенями в виртуальном цирке. Мой браузер – мой верный напарник, открывающий двери в мир красоты и интерактивности. Я мастерски воссоздаю веб-приключения, где каждая линия кода – это пироэффект, каждая анимация – акробатическое представление.</p>
					<a href="https://github.com/BadStandUp" className='about-me__link' rel='nofollow noopener noreferrer' target='_blank'>Github</a>
				</div>
				<img src={author} alt="Фото" className='about-me__image'/>
			</div>
			<Portfolio />
		</section>
	)
}