import {useState} from 'react';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import SwitchSlider from '../UI/Popup/SwitchSlider/SwitchSlider.jsx';

export default function SearchForm({ isSwitched, setIsSwitched, onSubmit }) {
	const [searchQuery, setSearchQuery] = useState(
		location.pathname === '/movies' && localStorage.getItem('search')
			? localStorage.getItem('search')
			: '',
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		localStorage.setItem('search', searchQuery);
		onSubmit();
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<section className="search-form">
			<form className="search-form__search-bar" name="searchForm" onSubmit={handleSubmit}>
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
			<SwitchSlider isSwitched={isSwitched} setIsSwitched={setIsSwitched} />
		</section>
	);
}
