import Header from "../components/Header"
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import img from '../assets/HomeImage.png';
import img2 from '../assets/tracking.jfif';
import img3  from '../assets/Lend.jfif';
import img4  from '../assets/borrow.jfif';
import img5 from '../assets/history.jfif'
import styles from '../styles/HomePage.module.css';
import Services from "../components/Services";
import Footer  from "../components/Footer";


function HomePage(){

  const navigate = useNavigate();
  
  //resetting the display settings
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

        <h3 style={{textAlign:'center', paddingTop:'10px', fontFamily:'Inter',marginTop:'80px',color:'#1A2258'}} className={styles.welcome}>
                    Welcome back Carlos Muleke</h3>


               <div className={styles.homeImage}>
                    <img src={img} className={styles.homeImage2} alt="home Image" style={{borderRadius:'20px'}} />
             </div>

         {/*comment section */}
        <p style={{textAlign:'center', padding:'10px', fontFamily:'Inter',marginTop:'50px',color:'#1A2258'}}>
          💬'I borrowed K30,000 for textbooks and paid it off in 3 months — super helpful!' — James, UNIMA"</p>

              {/*cards to display services offered by unifund*/}
               <div className={styles.servicesContainer}>
                          <Services title={<p> Lend <br /> Money</p>} image={img3} onClick={() => navigate("/lend")}/>
                          <Services title={<p>Borrow <br/> Money</p>} image={img4} onClick={() => navigate("/borrow")}/>
                          <Services title = {<p>Loan <br/> History</p>} image={img5}/>
                          <Services  title={<p>Track <br/> Payments</p>} image={img2}
                          onClick={() => navigate("/track-payments")}/>
              </div>


            {/*impact on campus*/}
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