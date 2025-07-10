import Header from "../components/Header"
import { useEffect } from "react";
import img from '../assets/HomeImage.png';
import img2 from '../assets/tracking.jfif';
import img3  from '../assets/Lend.jfif';
import img4  from '../assets/borrow.jfif';
import styles from '../styles/HomePage.module.css';
import Services from "../components/Services";
import Footer  from "../components/Footer";

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
        <h3 style={{textAlign:'center', color:'#1A2258', paddingTop:'20px'}}>Welcome Carlos Muleke</h3>
        <div className={styles.homeImage}>
        <img src={img} alt="home Image" style={{borderRadius: '15px', height:'27vh',
        width:'93vw'}} />
        </div>
        <p style={{textAlign:'center', padding:'10px', fontFamily:'Inter',marginTop:'50px',color:'#1A2258'}}>💬'I borrowed K30,000 for textbooks and paid it off in 3 months — super helpful!' — James, UNIMA"</p>
        <div className={styles.servicesContainer}>
              <Services title={<p> Lend <br /> Money</p>} image={img3}/>
              <Services title={<p>Borrow <br/> Money</p>} image={img4}/>
              <Services title = {<p>Loan <br/> History</p>} image={img4}/>
              <Services  title={<p>Track <br/> Payments</p>} image={img2}/>
        </div>
         <h2 style={{textAlign:'center'}}>Our impact on campus</h2>
         <div className={styles.impact}>
             <div className={styles.processed}>
              <h4>+250</h4>
              <p>Processed loans</p>
             </div>
             <div className={styles.processed}>
              <h4>+$5000</h4>
              <p>Total amount processed</p>
             </div>
             <div className={styles.processed}>
              <h4>99%</h4>
              <p>Payment rate</p>
             </div>
        </div>
          <Footer/>
        </>
   )
}
export default HomePage