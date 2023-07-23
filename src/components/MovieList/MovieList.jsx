import './MovieList.css'
import MovieCard from "../MovieCard/MovieCard.jsx";
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import {
	DESKTOP_WIDTH,
	MOVIES_MORE_DESKTOP,
	MOVIES_MORE_MOBILE,
	MOVIES_MORE_TABLET, MOVIES_SHOWN_MOBILE,
	TABLET_WIDTH
} from '../../utils/constants.js';

export default function MovieList({ movies }) {
	const location = useLocation();

	const [showElements, setShowElements] = useState(true)
	const [cardsPerRow, setCardsPerRow] = useState(3);
	const [loadMoreCount, setLoadMoreCount] = useState(3);
	const [visibleMovies, setVisibleMovies] = useState(cardsPerRow * 4);

	const foundMovies = JSON.parse(localStorage.getItem('filteredMovies'));

	useEffect(() => {
		if (location.pathname === '/saved-movies') {
			setShowElements(false);
		} else {
			setShowElements(true);
		}
	}, [location.pathname]);

	useEffect(() => {
		let resizeTimer;
		const handleResize = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				const screenWidth = window.innerWidth;
				let newCardsPerRow;
				let newLoadMoreCount;

				switch (true) {
					case screenWidth >= DESKTOP_WIDTH:
						newCardsPerRow = MOVIES_MORE_DESKTOP;
						newLoadMoreCount = MOVIES_MORE_DESKTOP;
						break;
					case screenWidth >= TABLET_WIDTH:
						newCardsPerRow = MOVIES_MORE_TABLET;
						newLoadMoreCount = MOVIES_MORE_TABLET;
						break;
					default:
						newCardsPerRow = MOVIES_MORE_MOBILE;
						newLoadMoreCount = MOVIES_MORE_TABLET;
						break;
				}

				setCardsPerRow(newCardsPerRow);
				setLoadMoreCount(newLoadMoreCount);
				setVisibleMovies(newCardsPerRow * MOVIES_SHOWN_MOBILE);
			}, 500);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			clearTimeout(resizeTimer);
		};
	}, []);

	const handleLoadMore = () => {
		setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + loadMoreCount);
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
				<button className="movies-card-list__more" onClick={handleLoadMore}>Ещё</button>
			)}
		</section>
	);
}