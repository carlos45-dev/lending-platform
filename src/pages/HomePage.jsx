import Header from "../components/Header"
import { useEffect } from "react";
import img from '../assets/HomeImage.png';
import img2 from '../assets/tracking.jfif';
import img3  from '../assets/Lend.jfif';
import img4  from '../assets/borrow.jfif';
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
            
              <Services title={<p> Lend <br /> Money</p>} image={img3}/>
              <Services title={<p>Borrow <br/> Money</p>} image={img4}/>
              <Services className={styles.services2} title = {<p>Loan <br/> History</p>} image={img4}/>
              <Services className={styles.services2} title={<p>Track <br/> Payments</p>} image={img2}/>
        </div>
        </>
   )
}
export default HomePage