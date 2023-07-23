import './SwitchSlider.css';
import {useEffect} from 'react';
import {useLocation} from 'react-router';

export default function SwitchSlider({ switched, setSwitched, handleClick }) {
	const location = useLocation();
	const storedSwitch = localStorage.getItem('switch');

	useEffect(() => {
		if (storedSwitch && location.pathname === '/movies') {
			setSwitched(true);
		}
	}, [storedSwitch, setSwitched, location.pathname]);

	const handleSwitchChange = () => {
		if (location.pathname === '/movies') {
			const click = handleClick();
			if (!switched) {
				setSwitched(true);
				localStorage.setItem('switch', true);
				click.filterWithSwitch();
			} else {
				setSwitched(false);
				localStorage.removeItem('switch');
				click.filter();
			}
		}
		if (location.pathname === '/saved-movies') {
			if (!switched) {
				setSwitched(true);
			} else {
				setSwitched(false);
			}
		}
	}

	return (
		<div className="search-form__switch">
			<label className="search-form__switch-container">
				<input
					type="checkbox"
					className="search-form__switch-input"
					checked={switched}
					onChange={handleSwitchChange}
				/>
				<span className="search-form__switch-slider"></span>
			</label>
			<p className="search-form__heading">Короткометражки</p>
		</div>
	)
}