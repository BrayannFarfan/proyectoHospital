import './AboutSection.css';
import doctorImage1 from '../../assets/about1.png';
import doctorImage2 from '../../assets/about2.png';
import { Link } from 'react-router';

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <h3>ABOUT OUR COMPANY</h3>
        <h1>Welcome To Our Hospital</h1>
        <p>
          There are many variations of passages of lorem ipsum liable, but the
          majority have suffered alteration in some form, by ected humour, or
          randomised words whi.
        </p>
        <div className="buttons">
            <Link className="btn primary" to={'/doctors'}>
                Find Doctors <span><span>&gt;</span></span>
            </Link>
            <Link className="btn secondary" to={'/appointment'}>
                Appointment <span><span>&gt;</span></span>
            </Link>
        </div>
      </div>
      <div className="about-images">
        <img src={doctorImage2} alt="Doctor with stethoscope" className="image-bottom" />
        <img src={doctorImage1} alt="Doctor with mask" className="image-top" />
      </div>
    </section>
  );
};

export default AboutSection;