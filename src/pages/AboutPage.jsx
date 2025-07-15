import React from 'react';
import styles from '../styles/About.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import aboutImg from '../assets/about.jfif'; 
import about2 from '../assets/about2.jfif';
import { useEffect } from 'react';

function AboutPage() {
     useEffect(() => {
                    const originalDisplay = document.body.style.display;
                    document.body.style.display = 'block';
                    return () => {
                    document.body.style.display = originalDisplay;
                      };
         }, []);
  return (
    <>
      <div className={styles.aboutWrapper}>
        <Header />

        {/* First Section: Image Left, Text Right */}
        <main className={styles.aboutSection}>
          <div className={styles.aboutImage}>
            <img src={about2} alt="Students collaborating" />
          </div>

          <div className={styles.aboutContent}>
            <h2 className={styles.heading}>About UniFund</h2>

            <div className={styles.aboutBlock}>
              <h3>Who is this Platform for?</h3>
              <p>
                University students who are looking for short-term loans, and lenders who want to provide
                financial support to trusted fellow students.
              </p>
            </div>

            <div className={styles.aboutBlock}>
              <h3>What’s the Purpose of this Platform?</h3>
              <ul>
                <li>Helping borrowers easily find available loans</li>
                <li>Helping lenders connect with reliable, trustworthy borrowers</li>
                <li>Tracking loan repayments and building borrower trust ratings</li>
              </ul>
            </div>
          </div>
        </main>

        {/* Second Section: Text Left, Image Right */}
        <section className={styles.aboutSection}>
          <div className={styles.aboutContent}>
            <div className={styles.aboutBlock} style={{paddingLeft:'5px'}}>
              <h3>Description</h3>
              <p>
                The platform works by allowing lenders to post loan offers on their own terms, which are then made
                visible to all users. Interested borrowers can send requests to lenders through the platform.
                Once the lender accepts and a transaction occurs, the app begins tracking repayment progress.
                Borrowers build a trust score over time, and those with higher ratings are shown first when they
                request new loans. This helps promote accountability and reliability within the student lending community.
              </p>
            </div>
          </div>

          <div className={styles.aboutImage}>
            <img src={aboutImg} alt="Loan request process" />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default AboutPage;
