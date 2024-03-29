import {useEffect, useState} from 'react';
import './MovieCard.css';
import {useLocation} from 'react-router';
import {SHORT_MOVIE_DURATION} from '../../utils/constants.js';


export default function MovieCard({
									  movie,
									  addMovie,
									  deleteMovie,
									  title,
									  image,
									  savedMovies,
								  }) {
	const location = useLocation();
	const [isLiked, setIsLiked] = useState(false);
	const currentSavedMovie = savedMovies.find((movie) => movie.nameRU === title);

	useEffect(() => {
		if (location.pathname === '/movies' && currentSavedMovie) {
			setIsLiked(true);
		}
	}, [currentSavedMovie]);

	const handleMovie = (e) => {
		e.preventDefault();
		if (location.pathname === '/movies') {
			if (!isLiked) {
				setIsLiked(true);
				addMovie(movie)
			} else {
				setIsLiked(false);
				deleteMovie(currentSavedMovie._id);
			}
		}
		if (location.pathname === '/saved-movies') {
			deleteMovie(movie._id);
		}
	};

	const openInNewTab = (url) => {
		const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
		if (newWindow) newWindow.opener = null;
	};

	const handleOpenInNewTab = () => {
		openInNewTab(movie.trailerLink);
	};

	const formatDuration = (minutes) => {
		const hours = Math.floor(minutes / SHORT_MOVIE_DURATION);
		const mins = minutes % SHORT_MOVIE_DURATION;
		return `${hours}ч ${mins}м`;
	};

	return (
		<article className="movies-card">
			<img
				src={image}
				alt={title}
				className='movies-card__image'
				onClick={handleOpenInNewTab}
			/>
			<div className='movies-card__container'>
				<h3 className="movies-card__title" title={title}>{title}</h3>
				<button
					type='button'
					className={`movies-card__like-button ${
						location.pathname === '/movies'
							? `'' ${isLiked ? 'movies-card__like-button_active' : ''}`
							: 'movies-card__delete-button'
					}`}
					onClick={handleMovie}
				></button>
			</div>
			<span className="movies-card__duration">{formatDuration(movie.duration)}</span>
		</article>
)}
