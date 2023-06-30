import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
export default function SearchForm() {
	return (
		<div className='search-form'>
			<div className='search-form__search-bar'>
				<img src={searchIcon} alt="" className='search-form__icon'/>
				<input type="text" placeholder='Фильмы' className='search-form__input'/>
				<button type='submit' className='search-form__button'>Найти</button>
			</div>
			<div className='search-form__switch'>
				<label className="search-form__switch-container">
					<input type="checkbox" className='search-form__switch-input'/>
						<span className="search-form__switch-slider"></span>
				</label>
				<p className='search-form__heading'>Короткометражки</p>
			</div>
		</div>
	)
}
