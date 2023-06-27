import './Movies.css';
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
export default function Movies() {
	return (
		<main className='movies'>
			<SearchForm />
			<MoviesCardList />
		</main>
	)
}