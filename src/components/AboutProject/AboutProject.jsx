import './AboutProject.css';

export default function AboutProject() {
	return (
		<div className='about-project' id='about-project'>
			<h2 className='about-project__heading'>О проекте</h2>
			<div className='about-project__container'>
				<div className='about-project__description'>
					<div className='about-project__description-container'>
						<h3 className='about-project__description-heading'>Дипломный проект включал 5 этапов</h3>
						<p className='about-project__description-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
					</div>
					<div className='about-project__description-container'>
						<h3 className='about-project__description-heading'>На выполнение диплома ушло 5 недель</h3>
						<p className='about-project__description-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
					</div>
				</div>
				<div className='about_project__graph'>
					<div className='about_project__graph-bar'>
						<p className='about_project__graph-progress'>1 неделя</p>
						<p className='about_project__graph-empty'>4 недели</p>
					</div>
					<div className='about_project__graph-description'>
						<p className='about_project__graph-description-frontend'>Back-end</p>
						<p className='about_project__graph-description-backend'>Front-end</p>
					</div>
				</div>
			</div>
		</div>
	)
}