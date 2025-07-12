import React from "react";
import styles from "../styles/Contact.module.css"; 
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Contact (){

    //resetting the display settings
        useEffect(() => {
                  const originalDisplay = document.body.style.display;
                  document.body.style.display = 'block';
                  return () => {
                  document.body.style.display = originalDisplay;
                    };
       }, []);

  return (
    <>
    <Header/>
    <section className={styles.contact} id="contact">
      <h2 className={styles.sectionTitle}>Contact</h2>

      <div className={styles.contactContainer}>
        <form action="" className={styles.contactForm}>
          <input type="text" placeholder="Name" className={styles.contactInput} />
          <input type="email" placeholder="Email" className={styles.contactInput} />
          <textarea
            cols="0"
            rows="10"
            placeholder="Message"
            className={styles.contactInput}
          ></textarea>
          <input type="button" value="Send" className={`${styles.contactButton} ${styles.button}`} />
        </form>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Contact;
