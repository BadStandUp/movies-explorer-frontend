import './Preloader.css'
import {useEffect} from 'react';

const Preloader = ({fullScreen}) => {

    useEffect(() => {
        if (fullScreen) {
            document.querySelector(".preloader").classList.add('preloader_full-screen');
        } else {
            document.querySelector(".preloader").classList.remove('preloader_full-screen');
        }
    })

    return (
        <div className="preloader">
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader;
