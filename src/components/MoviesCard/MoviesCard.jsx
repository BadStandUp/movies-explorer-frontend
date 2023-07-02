import './MoviesCard.css';
import moviePreview from '../../images/movie_preview.png'

export default function MoviesCard() {
	const toggleLike = (e) => {
		e.target.classList.toggle('movies-card__like-button_active')
	}

	return (
		<article className="movies-card">
			<img src={moviePreview} alt="" className='movies-card__image' />
			<div className='movies-card__container'>
				<h3 className="movies-card__title">Название фильма</h3>
				<button className="movies-card__like-button" onClick={toggleLike}></button>
			</div>
			<span className="movies-card__duration">1ч 42м</span>
		</article>
)}