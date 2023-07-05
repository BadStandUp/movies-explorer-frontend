import './Header.css';
import {NavLink} from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from '../../images/logo.svg'

export default function Header({ loggedIn }) {
    return (
        <header className='header'>
            <nav className='header__container'>
                <NavLink to='/' className='header__logo-link'>
                    <img src={logo} alt="Лого" className='header__logo'/>
                </NavLink>
                <Navigation loggedIn={loggedIn} />
            </nav>
        </header>
    )
}
