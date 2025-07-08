import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser,faBars } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Header.module.css';
function Header(){

    return(
       <div className={styles.header}>
        <div className={styles.user}>
            <FontAwesomeIcon icon={faCircleUser} size='2x'/>
             <h3>Carlos Muleke</h3>
        </div>

    

         <div>
         <FontAwesomeIcon icon={faBars} size='2x'/>
         </div>

       </div>
    );
}

export default Header