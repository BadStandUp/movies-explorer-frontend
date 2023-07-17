import './MovieList.css'
import MovieCard from "../MovieCard/MovieCard.jsx";
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router';

export default function MovieList({ movies }) {
	const location = useLocation();

	const [showElements, setShowElements] = useState(true)
	const [visibleMovies, setVisibleMovies] = useState(0);
	const [cardsPerRow, setCardsPerRow] = useState(0);
	const [loadMoreCount, setLoadMoreCount] = useState(0);

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
					case screenWidth >= 1280:
						newCardsPerRow = 3;
						newLoadMoreCount = 3;
						break;
					case screenWidth >= 768:
						newCardsPerRow = 2;
						newLoadMoreCount = 2;
						break;
					default:
						newCardsPerRow = 1;
						newLoadMoreCount = 2;
				}

				setCardsPerRow(newCardsPerRow);
				setLoadMoreCount(newLoadMoreCount);
			}, 500);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			clearTimeout(resizeTimer);
		};
	}, []);

	useEffect(() => {
		setVisibleMovies(cardsPerRow);
	}, [cardsPerRow]);

	const handleLoadMore = () => {
		setVisibleMovies(prevVisibleMovies => prevVisibleMovies + loadMoreCount);
	};

	return (
		<section className="movies-card-list">
			<div className="movies-card-list__grid">
				{showElements
					? foundMovies.slice(0, visibleMovies).map(foundMovie => (
						<MovieCard
							key={foundMovie.id}
							movie={foundMovie}
							image={`https://api.nomoreparties.co/${foundMovie.image.url}`}
						/>
					))
					: movies.slice(0, visibleMovies).map(movie => (
						<MovieCard key={movie._id} movie={movie} image={movie.image} />
					))}
			</div>
			{showElements && visibleMovies < (foundMovies || movies).length && (
				<button className="movies-card-list__more" onClick={handleLoadMore}>Ещё</button>
			)}
		</section>
	);
}