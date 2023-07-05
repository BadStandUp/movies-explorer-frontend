import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList() {
	return (
		<section className='movies-card-list'>
			<div className='movies-card-list__grid'>
				<MoviesCard />
				<MoviesCard />
				<MoviesCard />
				<MoviesCard />
				<MoviesCard />
				<MoviesCard />
				<MoviesCard />
			</div>
			<button className='movies-card-list__more'>Ещё</button>
		</section>
	)
}