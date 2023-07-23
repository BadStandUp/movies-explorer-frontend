import './MovieList.css'
import MovieCard from "../MovieCard/MovieCard.jsx";
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import {
	DESKTOP_WIDTH, MOBILE_WIDTH,
	MOVIES_MORE_DESKTOP, MOVIES_MORE_FULL,
	MOVIES_MORE_MOBILE,
	MOVIES_MORE_TABLET, MOVIES_SHOWN_DESKTOP, MOVIES_SHOWN_FULL, MOVIES_SHOWN_MOBILE, MOVIES_SHOWN_TABLET,
	TABLET_WIDTH
} from '../../utils/constants.js';

export default function MovieList({
									  handleAddMovie,
									  handleDeleteMovie,
									  error,
									  savedMovies,
									  savedRequest,
									  savedResultMovies,
								  }) {
	const location = useLocation();

	const foundMovies = JSON.parse(localStorage.getItem('filteredMovies'));
	const [buttonShown, setButtonShown] = useState(false);
	const [moviesShown, setMoviesShown] = useState(MOVIES_SHOWN_FULL);

	useEffect(() => {
		if (location.pathname === '/movies') {
			if (window.innerWidth < MOBILE_WIDTH) {
				setMoviesShown(MOVIES_SHOWN_MOBILE);
			} else if (window.innerWidth < TABLET_WIDTH) {
				setMoviesShown(MOVIES_SHOWN_TABLET);
			} else if (window.innerWidth < DESKTOP_WIDTH) {
				setMoviesShown(MOVIES_SHOWN_DESKTOP);
			} else if (window.innerWidth >= DESKTOP_WIDTH) {
				setMoviesShown(MOVIES_SHOWN_FULL);
			}
			if (foundMovies.length > moviesShown) {
				setButtonShown(true);
			}
			if (foundMovies.length <= moviesShown || foundMovies.length === 0) {
				setButtonShown(false);
			}
		}
	}, []);

	useEffect(() => {
		if (location.pathname === '/movies') {
			if (foundMovies.length > moviesShown) {
				setButtonShown(true);
			}
			if (foundMovies.length <= moviesShown || foundMovies.length === 0) {
				setButtonShown(false);
			}
		}
	}, [moviesShown, foundMovies]);

	function handleMore() {
		if (window.innerWidth < MOBILE_WIDTH) {
			setMoviesShown(moviesShown + MOVIES_MORE_MOBILE);
			if (foundMovies.length <= moviesShown + MOVIES_MORE_MOBILE) {
				setButtonShown(false);
			}
		} else if (window.innerWidth < TABLET_WIDTH) {
			setMoviesShown(moviesShown + MOVIES_MORE_TABLET);
			if (foundMovies.length <= moviesShown + MOVIES_MORE_TABLET) {
				setButtonShown(false);
			}
		} else if (window.innerWidth < DESKTOP_WIDTH) {
			setMoviesShown(moviesShown + MOVIES_MORE_DESKTOP);
			if (foundMovies.length <= moviesShown + MOVIES_MORE_DESKTOP) {
				setButtonShown(false);
			}
		} else if (window.innerWidth >= DESKTOP_WIDTH) {
			setMoviesShown(moviesShown + MOVIES_MORE_FULL);
			if (foundMovies.length <= moviesShown + MOVIES_MORE_FULL) {
				setButtonShown(false);
			}
		}
	}

	return (
		<section className="movies-card-list">
			<div className="movies-card-list__grid">
				{error ? (
					<p className="movies__error">{error}</p>
				) : location.pathname === '/movies' ? (
					foundMovies.length > 0 ? (
						foundMovies.slice(0, moviesShown).map((card) => (
							<MovieCard
								movie={card}
								addMovie={handleAddMovie}
								deleteMovie={handleDeleteMovie}
								key={card.nameEN}
								title={card.nameRU}
								image={`https://api.nomoreparties.co/${card.image.url}`}
								savedMovies={savedMovies}
							/>
						))
					) : (
						<p className="movies__error">Ничего не найдено</p>
					)
				) : location.pathname === '/saved-movies' && savedRequest ? (
					savedResultMovies.length > 0 ? (
						savedResultMovies.map((card) => (
							<MovieCard
								movie={card}
								addMovie={handleAddMovie}
								deleteMovie={handleDeleteMovie}
								key={card.nameEN}
								title={card.nameRU}
								image={card.image}
								savedMovies={savedMovies}
							/>
						))
					) : (
						<p className="movies__error">Ничего не найдено</p>
					)
				) : location.pathname === '/saved-movies' && !savedRequest ? (
					savedMovies.map((card) => (
						<MovieCard
							movie={card}
							addMovie={handleAddMovie}
							deleteMovie={handleDeleteMovie}
							key={card.nameEN}
							title={card.nameRU}
							image={card.image}
							savedMovies={savedMovies}
						/>
					))
				) : null}
			</div>
			{location.pathname === '/movies' && buttonShown && !error && (
				<button className="movies-card-list__more" onClick={handleMore}>
					Ещё
				</button>
			)}
		</section>
	);
}