import './Main.css'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Promo from "../../components/Promo/Promo";
import NavTab from "../../components/NavTab/NavTab";
import AboutProject from "../../components/AboutProject/AboutProject";
import Techs from "../../components/Techs/Techs";
import AboutMe from "../../components/AboutMe/AboutMe";

export default function Main() {

    return (
        <>
            <Header loggedIn={false}/>
            <main className='main'>
                <Promo />
                <NavTab />
                <AboutProject />
                <Techs />
                <AboutMe />
            </main>
            <Footer />
        </>

    )
}
