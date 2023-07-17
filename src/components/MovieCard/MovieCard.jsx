import {useContext, useEffect, useState} from 'react';
import './MovieCard.css';
import {SavedMoviesContext} from '../../contexts/SavedMoviesContext.js';
import * as mainApi from '../../utils/MainApi';
import {useLocation} from 'react-router';

export default function MovieCard({ movie, image }) {
	const location = useLocation();
	const { savedMovies, setSavedMovies } = useContext(SavedMoviesContext);
	const [isLiked, setIsLiked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [button, setButton] = useState(false);
	
	useEffect(() => {
		if (location.pathname === '/saved-movies') {
			setButton(false);
		} else {
			setButton(true);
		}
	}, []);
	
	const addToSavedMovies = (movie) => {
		setSavedMovies((prevMovies) => [...prevMovies, movie]);
	};

	const removeFromSavedMovies = (movieId) => {
		setSavedMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
	};

	useEffect(() => {
		const isMovieSaved = savedMovies.some((savedMovie) => savedMovie.id === movie.id);
		setIsLiked(isMovieSaved);
	}, [savedMovies, movie.id]);

	const handleLikeClick = async () => {
		setIsLoading(true);
		try {
			if (isLiked) {
				await mainApi.deleteMovie(movie._id);
				removeFromSavedMovies(movie.id);
				setIsLiked(false);
			} else {
				await mainApi.addMovie(movie);
				addToSavedMovies(movie);
				setIsLiked(true);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
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
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours}ч ${mins}м`;
	};

	return (
		<article className="movies-card">
			<img
				src={image}
				alt={movie.nameRU}
				className='movies-card__image'
				onClick={handleOpenInNewTab}
			/>
			<div className='movies-card__container'>
				<h3 className="movies-card__title" title={movie.nameRU}>{movie.nameRU}</h3>
				<button
					className={`${button ? 'movies-card__like-button' : 'movies-card__delete-button'} ${button && isLiked ? 'movies-card__like-button_active' : ''}`}
					onClick={handleLikeClick}
					disabled={isLoading}
				></button>
			</div>
			<span className="movies-card__duration">{formatDuration(movie.duration)}</span>
		</article>
)}
