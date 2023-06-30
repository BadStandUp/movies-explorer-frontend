import './Movies.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
export default function Movies() {
	return (
		<>
			<Header />
			<main className='movies'>
				<SearchForm />
				<MoviesCardList />
			</main>
			<Footer />
		</>

	)
}