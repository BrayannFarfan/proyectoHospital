import WordSwap from '../WordSwap/WordSwap'
import './heroSection.css'
import { Link } from 'react-router'


export const  HeroSection = () =>{



    return(
        <section className="hero-section">
            <div className="hero-content">
                <h3>COMMITTED TO SUCCESS</h3>
                <h1>
                <WordSwap words={['WE CARE ABOUT', 'WE SUPPORT', 'WE ENSURE']} />
                <br />
                <span className="dynamic-word">YOUR HEALTH</span>
                </h1>
                <p>
                At our hospital, we offer expert care with compassionate staff, using advanced technology for your well-being and personalized treatment.
                </p>
                <div>
                    <Link className="appointment-btn" to={'/appointment'}>
                        Appointment <span>&gt;</span>
                    </Link>
                </div>
            </div>
    </section>
    )
}