import './Promo.css';
import landing_logo from '../../images/landing_logo.svg'

export default function Promo() {
	return (
		<div className='promo'>
			<h1 className='promo__heading'>Учебный проект студента факультета Веб-разработки.</h1>
			<img src={landing_logo} alt="Логотип"/>
		</div>
	)
}