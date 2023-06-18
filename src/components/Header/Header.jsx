import './Header.css';
import {NavLink} from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from '../../images/logo.svg'

export default function Header() {
    return (
        <header className='header'>
            <NavLink to='/'>
                <img src={logo} alt="Лого"/>
            </NavLink>
            <Navigation />
        </header>
    )
}
