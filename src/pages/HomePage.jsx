import Header from "../components/Header"
import { useEffect } from "react";
import img from '../assets/HomeImage.png';
import styles from '../styles/HomePage.module.css';
import Services from "../components/Services";
function HomePage(){
    useEffect(() => {
     const originalDisplay = document.body.style.display;
     document.body.style.display = 'block';
     return () => {
     document.body.style.display = originalDisplay;
       };
  }, []);

   return(
      <>
        <Header/>
        <div className={styles.homeImage}>
        <img src={img} alt="home Image" style={{borderRadius: '20px', height:'200px',
        width:'350px'}} />
        </div>
        <div className={styles.servicesContainer}>
            <div>
                <Services/>
                <Services/>
            </div>
           <div className={styles.servicesContainer2}>
              <Services />
              <Services/>
          </div>
        </div>
        </>
   )
}
export default HomePage