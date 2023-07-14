import './Movies.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MoviesCardList/MovieList.jsx";
export default function Movies(props) {
	return (
		<>
			<Header loggedIn={props.loggedIn}/>
			<main className='movies'>
				<SearchForm />
				<MovieList movies={props.movies}/>
			</main>
			<Footer />
		</>

	)
}