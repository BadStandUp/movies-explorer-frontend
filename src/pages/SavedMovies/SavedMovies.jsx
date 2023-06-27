import './SavedMovies.css';
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
export default function SavedMovies() {
	return (
		<main className='saved-movies'>
			<SearchForm />
			<MoviesCardList />
		</main>
	)
}