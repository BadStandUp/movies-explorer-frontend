import './MovieList.css'
import MovieCard from "../MoviesCard/MovieCard.jsx";

export default function MovieList({ movies }) {
	return (
		<section className='movies-card-list'>
			<div className='movies-card-list__grid'>
				{movies?.map((movie) => (
					<MovieCard key={movie.id} movie={movie}/>
				))}
			</div>
			<button className='movies-card-list__more'>Ещё</button>
		</section>
	)
}