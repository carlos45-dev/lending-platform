import Header from "../components/Header"
import { useEffect } from "react";
import img from '../assets/HomeImage.png';
import styles from '../styles/HomePage.module.css';
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
        </>
   )
}
export default HomePage