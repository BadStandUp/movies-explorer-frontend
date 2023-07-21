import './Popup.css';

export default function Popup({message}) {
	return (
		<div className='popup'>
				{/*<img className='popup_image' src="" alt=""/>*/}
				<p className='popup__message'>{message}</p>
		</div>
	)
}