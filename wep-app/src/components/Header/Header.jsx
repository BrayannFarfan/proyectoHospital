import { Link } from "react-router";
import './header.css'



export const Header = () => {



    return(
        <>
            <header className="header_container">
                <div>
                    <h1>Heal <span>thia.</span></h1>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link className="header_link"  to={'/'}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className="header_link" to={'/about'}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link className="header_link" to={'/doctors'}>
                                Doctors
                            </Link>
                        </li>
                        <li>
                            <Link className="header_link" to={'/departaments'}>
                                Departaments
                            </Link>
                        </li>
                        <li>
                            <Link className="header_link" to={'/appointment'}>
                                Appointment
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}