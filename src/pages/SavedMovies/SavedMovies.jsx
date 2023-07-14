import './SavedMovies.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MoviesCardList/MovieList.jsx";
export default function SavedMovies(props) {
	return (
		<>
			<Header loggedIn={props.loggedIn}/>
			<main className='saved-movies'>
				<SearchForm />
				<MovieList />
			</main>
			<Footer />
		</>

	)
}