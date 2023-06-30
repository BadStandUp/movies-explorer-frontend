import './SavedMovies.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
export default function SavedMovies() {
	return (
		<>
			<Header />
			<main className='saved-movies'>
				<SearchForm />
				<MoviesCardList />
			</main>
			<Footer />
		</>

	)
}