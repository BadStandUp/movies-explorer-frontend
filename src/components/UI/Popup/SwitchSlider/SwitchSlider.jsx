import './SwitchSlider.css';
import {useEffect} from 'react';
import {useLocation} from 'react-router';

export default function SwitchSlider({ isSwitched, setIsSwitched }) {
	const location = useLocation();
	const storedSwitch = localStorage.getItem('switch')

	useEffect(() => {
		if (storedSwitch && location.pathname === '/movies') {
			setIsSwitched(true);
		}
	}, [storedSwitch, setIsSwitched, location.pathname])

	const handleSwitchChange = () => {
		if (location.pathname === '/movies') {
			if (!isSwitched) {
				setIsSwitched(true);
				localStorage.setItem('switch', true);
			} else {
				setIsSwitched(false);
				localStorage.removeItem('switch')
			}
		}
		if (location.pathname === '/saved-movies') {
			if (!isSwitched) {
				setIsSwitched(true);
			} else {
				setIsSwitched(false);
			}
		}
	}

	return (
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
	)
}