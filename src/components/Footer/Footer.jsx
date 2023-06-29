import './Footer.css'

export default function Footer() {
    const date = new Date().getFullYear();

    return (
        <footer className='footer'>
            <h3 className='footer__heading'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className='footer__container'>
                <p className='footer__date'>&copy; {date}</p>
                <div className='footer__links'>
                    <a href="https://practicum.yandex.ru/" className='footer__link' rel='nofollow noopener noreferrer' target='_blank'>Яндекс.Практикум</a>
                    <a href="https://github.com/BadStandUp" className='footer__link' rel='nofollow noopener noreferrer' target='_blank'>Github</a>
                </div>
            </div>
        </footer>
    )
}