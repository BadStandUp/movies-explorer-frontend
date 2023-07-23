import './Popup.css';

export default function Popup({message, error}) {
	return (
		<div className={`popup ${error ? 'popup_error' : 'popup_success'}`}>
				{/*<img className='popup_image' src="" alt=""/>*/}
				<p className='popup__message'>{message}</p>
		</div>
	)
}