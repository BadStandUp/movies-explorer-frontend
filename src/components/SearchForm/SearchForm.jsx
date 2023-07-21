import {useEffect, useState} from 'react';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';

export default function SearchForm({ onSubmit, onSwitchChange }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [isSwitched, setIsSwitched] = useState(true);

	useEffect(() => {
		const storedSearchQuery = localStorage.getItem('search');
		if (storedSearchQuery) {
			setSearchQuery(storedSearchQuery);
		}

		const storedIsSwitched = localStorage.getItem('isSwitched');
		if (storedIsSwitched) {
			setIsSwitched(storedIsSwitched === 'false');
		}
	}, [isSwitched]);

	const handleSubmit = (e) => {
		e.preventDefault();
		localStorage.setItem('search', searchQuery);
		onSubmit();
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSwitchChange = (e) => {
		const value = e.target.checked;
		setIsSwitched(value);
		onSwitchChange(value);
	};

	useEffect(() => {
		localStorage.setItem('isSwitched', isSwitched.toString());
	}, [isSwitched]);

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
			<div className="search-form__switch">
				<label className="search-form__switch-container">
					<input
						type="checkbox"
						className="search-form__switch-input"
						checked={isSwitched}
						onChange={handleSwitchChange}
					/>
					<span className="search-form__switch-slider"></span>
				</label>
				<p className="search-form__heading">Короткометражки</p>
			</div>
		</section>
	);
}
