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

export default function MovieList({ movies }) {
	const location = useLocation();

	const [showElements, setShowElements] = useState(true)

	const [visibleMovies, setVisibleMovies] = useState(MOVIES_SHOWN_DESKTOP);

	const foundMovies = JSON.parse(localStorage.getItem('filteredMovies'));

	useEffect(() => {
		if (location.pathname === '/movies') {
			if (window.innerWidth < DESKTOP_WIDTH) {
				setVisibleMovies(MOVIES_SHOWN_DESKTOP);
			} else if (window.innerWidth >= DESKTOP_WIDTH) {
				setVisibleMovies(MOVIES_SHOWN_FULL);
			} else if (window.innerWidth < TABLET_WIDTH) {
				setVisibleMovies(MOVIES_SHOWN_TABLET);
			} else if (window.innerWidth < MOBILE_WIDTH) {
				setVisibleMovies(MOVIES_SHOWN_MOBILE);
			}
			if (foundMovies.length > visibleMovies) {
				setShowElements(true);
			}
			if (foundMovies.length <= visibleMovies || foundMovies.length === 0) {
				setShowElements(false);
			}
		}
	})

	useEffect(() => {
		if (location.pathname === '/movies') {
			if (foundMovies.length > visibleMovies) {
				setShowElements(true);
			}
			if (foundMovies.length <= visibleMovies || foundMovies.length === 0) {
				setShowElements(false);
			}
		}
	}, [foundMovies, visibleMovies]);


	const handleMore = () => {
		if (window.innerWidth < MOBILE_WIDTH) {
			setVisibleMovies(visibleMovies + MOVIES_MORE_MOBILE);
			if (foundMovies.length <= visibleMovies + MOVIES_MORE_MOBILE) {
				setShowElements(false);
			}
		} else if (window.innerWidth < TABLET_WIDTH) {
			setVisibleMovies(visibleMovies + MOVIES_MORE_TABLET);
			if (foundMovies.length <= visibleMovies + MOVIES_MORE_TABLET) {
				setShowElements(false);
			}
		} else if (window.innerWidth < DESKTOP_WIDTH) {
			setVisibleMovies(visibleMovies + MOVIES_MORE_DESKTOP);
			if (foundMovies.length <= visibleMovies + MOVIES_MORE_DESKTOP) {
				setShowElements(false);
			}
		} else if (window.innerWidth >= DESKTOP_WIDTH) {
			setVisibleMovies(visibleMovies + MOVIES_MORE_FULL);
			if (foundMovies.length <= visibleMovies + MOVIES_MORE_FULL) {
				setShowElements(false);
			}
		}
	};

	return (
		<section className="movies-card-list">
			<div className="movies-card-list__grid">
				{showElements
					? (foundMovies ?? []).slice(0, visibleMovies).map((foundMovie) => (
						<MovieCard
							key={foundMovie.id}
							movie={foundMovie}
							image={`https://api.nomoreparties.co/${foundMovie.image.url}`}
							title={foundMovie.nameRU}
						/>
					))
					: (movies ?? []).slice(0, visibleMovies).map((movie) => (
						<MovieCard key={movie._id} movie={movie} image={movie.image} title={movie.nameRU} />
					))}
			</div>
			{showElements && visibleMovies < (foundMovies || movies)?.length && (
				<button className="movies-card-list__more" onClick={handleMore}>Ещё</button>
			)}
		</section>
	);
}