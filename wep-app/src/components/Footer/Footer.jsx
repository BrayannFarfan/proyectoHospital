import React from 'react';
import { Link } from 'react-router';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h1>Heal <span>thia.</span></h1>
        </div>
        <div className="footer-section">
          <h4>ABOUT</h4>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/login-user">Login</Link></li>
            <li><Link to="/register-user">Register</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>USEFUL LINKS</h4>
          <ul>
            <li><Link to="/doctors">Doctors</Link></li>
            <li><Link to="/clinics">Clinics</Link></li>
            <li><Link to="/specialization">Specialization</Link></li>
            <li><Link to="/join">Join as a Doctor</Link></li>
            <li><Link to="/download">Download App</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>CONTACT WITH US</h4>
          <ul>
            <li><span role="img" aria-label="phone">📞</span> +54 11 2345 5645</li>
            <li><span role="img" aria-label="email">📧</span> help@healthia.com</li>
          </ul>
          <div className="social-icons">
            <h4>Follow us</h4>
            <Link to="/facebook" className="social-link">
              <FaFacebookF />
            </Link>
            <Link to="/twitter" className="social-link">
              <FaTwitter />
            </Link>
            <Link to="/linkedin" className="social-link">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Terms and conditions | <Link to="/terms" className='term_conditions'>Privacy</Link></p>
        <p>© Healt Thia</p>
      </div>
    </footer>
  );
};