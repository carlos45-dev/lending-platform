import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faWhatsapp, faFacebook } from "@fortawesome/free-brands-svg-icons";
import styles from '../styles/Footer.module.css';
import { useNavigate } from "react-router-dom";

function Footer(){

 const navigate = useNavigate();
     return(
      <div className={styles.footerContainer}>
       <div className={ styles.termscontainer}>
        <p onClick={() => navigate("/terms")}>Terms and Conditions</p>
        <p>Cookies</p>
        <p>FAQS</p>
        <p>&copy; {new Date().getFullYear()} UniFund. All rights reserved.</p>
       </div>
       <div className={styles.social}>
        <a href="https://www.linkedin.com/in/carlos-muleke-084552362" className="footer__icon">
          <FontAwesomeIcon icon={faLinkedin} style={{ color: '#0077B5'  }} />
        </a>
        <a href="https://github.com/carlos45-dev" className="footer__icon">
          <FontAwesomeIcon icon={faGithub} style={{ color: '#ffffff' }} />
        </a>
        <a href="https://wa.me/265992779377" className="footer__icon">
          <FontAwesomeIcon icon={faWhatsapp} style={{ color: '#25D366' }} />
        </a>
        <a href="https://web.facebook.com/carlos.bathromew" className="footer__icon">
          <FontAwesomeIcon icon={faFacebook} style={{ color: '#1877F2' }} />
        </a>
      </div>
      </div>
     )
}
export default Footer