import './Footer.css'

export default function Footer() {
    const date = new Date().getFullYear();

    return (
        <footer className='footer'>
            <div>
                <p>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            </div>
            <div>
                <p className='footer__date'>&copy; {date}</p>
                <div className='footer__links'>
                    <a href="#">Яндекс.Практикум</a>
                    <a href="#">Github</a>
                </div>
            </div>
        </footer>
    )
}