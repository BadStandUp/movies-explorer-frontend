import Portfolio from "../Portfolio/Portfolio";
import './AboutMe.css';

export default function AboutMe() {
	return (
		<div className='about-me'>
			<h2 className='about-me__heading'>Студент</h2>
			<div className='about-me__container'>
				<div className=''>
					<h3 className='about-me__name'>1</h3>
					<p className='about-me__description'>123431241234325412343124</p>
					<p className='about-me__text'>41234`12341234123412341234123423141234</p>
					<a href="#" className='about-me__link'>Github</a>
				</div>
				<img src="" alt="" className='about-me__image'/>
			</div>
			<Portfolio />
		</div>
	)
}