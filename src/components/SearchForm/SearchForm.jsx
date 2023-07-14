import {useCallback, useState} from 'react';

import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';

export default function SearchForm() {
	const [searchText, setSearchText] = useState('');

	const handleSearchChange = useCallback((e) => {
		setSearchText(e.target.value);
	},[])

	return (
		<section className='search-form'>
			<form className='search-form__search-bar'>
				<img src={searchIcon} alt="" className='search-form__icon'/>
				<input
					type="text"
					placeholder='Фильмы'
					className='search-form__input'
					maxLength='50'
					aria-label='Поиск фильма'
					value={searchText}
					onChange={handleSearchChange}
				/>
				<button type='button' className='search-form__button'>Найти</button>
			</form>
			<div className='search-form__switch'>
				<label className="search-form__switch-container">
					<input type="checkbox" className='search-form__switch-input'/>
						<span className="search-form__switch-slider"></span>
				</label>
				<p className='search-form__heading'>Короткометражки</p>
			</div>
		</section>
	)
}
