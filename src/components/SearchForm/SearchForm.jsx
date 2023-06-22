import './SearchForm.css';
export default function SearchForm() {
	return (
		<div className='search-form'>
			<div className='search-form__search-bar'>
				<input type="text" placeholder='Фильмы' className='search-form__input'/>
				<button type='submit' className='search-form__button'></button>
			</div>
			<div className='search-form__switch'>
				<p className='search-form__heading'>Короткометражки</p>
				<label className="search-form__switch-container">
					<input type="checkbox" className='search-form__switch-input'/>
						<span className="search-form__switch-slider"></span>
				</label>
			</div>
		</div>
	)
}