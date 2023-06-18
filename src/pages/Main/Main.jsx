import './Main.css'
import Promo from "../../components/Promo/Promo";
import NavTab from "../../components/NavTab/NavTab";
import AboutProject from "../../components/AboutProject/AboutProject";
import Techs from "../../components/Techs/Techs";
import AboutMe from "../../components/AboutMe/AboutMe";

export default function Main() {

    return (
        <main className='main'>
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
        </main>
    )
}
