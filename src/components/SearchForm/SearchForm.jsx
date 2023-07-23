import {useState} from 'react';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import SwitchSlider from '../UI/SwitchSlider/SwitchSlider.jsx';

export default function SearchForm({ switched, setSwitched, onSubmit, handleClick }) {
	const [searchQuery, setSearchQuery] = useState(
		location.pathname === '/movies' && localStorage.getItem('search')
			? localStorage.getItem('search')
			: '',
	);

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<section className="search-form">
			<form className="search-form__search-bar" name="searchForm" onSubmit={e => {
				e.preventDefault();
				onSubmit(searchQuery);
			}}>
				<img src={searchIcon} alt="" className="search-form__icon" />
				<input
					type="text"
					placeholder="Фильмы"
					className="search-form__input"
					maxLength="50"
					aria-label="Поиск фильма"
					value={searchQuery || ''}
					onChange={handleSearchChange}
				/>
				<button type="submit" className="search-form__button">
					Найти
				</button>
			</form>
			<SwitchSlider switched={switched} setSwitched={setSwitched} handleClick={handleClick} />
		</section>
	);
}
