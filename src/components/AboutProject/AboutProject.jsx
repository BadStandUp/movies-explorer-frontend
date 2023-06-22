import './AboutProject.css';

export default function AboutProject() {
	return (
		<div className='about-project'>
			<h2 className='about-project__heading'>О проекте</h2>
			<div className='about-project__container'>
				<div className='about-project__description'>
					<div>
						<h3 className='about-project__description-heading'>Дипломный проект включал 5 этапов</h3>
						<p className='about-project__description-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
					</div>
					<div>
						<h3 className='about-project__description-heading'>На выполнение диплома ушло 5 недель</h3>
						<p className='about-project__description-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
					</div>
				</div>
				<div className='about_project__graph'>
					<div className='about_project__graph-container'>
						<div className='about_project__graph-progress'>1 неделя</div>
						<div className='about_project__graph-empty'>4 недели</div>
					</div>
					<div className='about_project__graph-description'>
						<div className='about_project__graph-description-frontend'>Back-end</div>
						<div className='about_project__graph-description-backend'>Front-end</div>
					</div>
				</div>
			</div>
		</div>
	)
}