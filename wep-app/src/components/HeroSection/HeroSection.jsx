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
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex ea commodo consequat is aute irure.
                </p>
                <div>
                    <Link className="appointment-btn">
                        Appointment <span>&gt;</span>
                    </Link>
                </div>
            </div>
    </section>
    )
}