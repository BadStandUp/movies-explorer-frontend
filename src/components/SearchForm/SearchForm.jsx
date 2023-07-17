import { useState} from 'react';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';

export default function SearchForm({ onSubmit, onSwitchChange }) {
	const [searchQuery, setSearchQuery] = useState('');
	const [isSwitched, setIsSwitched] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		localStorage.setItem('search', searchQuery)
		onSubmit();
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSwitchChange = (e) => {
		setIsSwitched(e.target.checked);
		onSwitchChange(e.target.checked);
	};

	return (
		<section className='search-form'>
			<form className='search-form__search-bar' name='searchForm' onSubmit={handleSubmit}>
				<img src={searchIcon} alt="" className='search-form__icon'/>
				<input
					type="text"
					placeholder='Фильмы'
					className='search-form__input'
					maxLength='50'
					aria-label='Поиск фильма'
					value={searchQuery || ''}
					onChange={handleSearchChange}
				/>
				<button type='submit' className='search-form__button'>Найти</button>
			</form>
			<div className='search-form__switch'>
				<label className="search-form__switch-container">
					<input type="checkbox" className='search-form__switch-input' checked={isSwitched} onChange={handleSwitchChange}/>
						<span className="search-form__switch-slider"></span>
				</label>
				<p className='search-form__heading'>Короткометражки</p>
			</div>
		</section>
	)
}
