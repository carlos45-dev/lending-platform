import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Cookies.module.css';
import { useEffect } from 'react';

function Cookies() {
     useEffect(() => {
                        const originalDisplay = document.body.style.display;
                        document.body.style.display = 'block';
                        return () => {
                        document.body.style.display = originalDisplay;
                          };
             }, []);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>UniFund Cookie Policy</h1>
        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Introduction</h2>
            <p className={styles.text}>
              At UniFund, our peer-to-peer lending platform for students, we use cookies to provide a seamless and secure experience. This Cookie Policy explains how we use cookies, what types we use, and how you can manage them. By using UniFund, you agree to our use of cookies as described below.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What Are Cookies?</h2>
            <p className={styles.text}>
              Cookies are small text files stored on your device (e.g., computer, phone) when you visit UniFund. They help us remember your preferences, secure your account, and improve platform features like loan tracking and payment management.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Types of Cookies We Use</h2>
            <ul className={styles.list}>
              <li>
                <strong>Essential Cookies:</strong> These cookies are critical for UniFund’s core functionality, such as logging into your account, processing loan requests, and tracking repayments. They cannot be disabled.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> We use these to analyze how students use UniFund, such as which lending or borrowing features are most popular, to enhance platform performance and user experience.
              </li>
              <li>
                <strong>Preference Cookies:</strong> These store your settings, like display preferences or notification settings, to personalize your UniFund experience.
              </li>
              <li>
                <strong>Marketing Cookies:</strong> These may be used to show you relevant promotions about UniFund’s services, such as new lending opportunities, if you opt in.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>How UniFund Uses Cookies</h2>
            <p className={styles.text}>
              Cookies enable UniFund to:
            </p>
            <ul className={styles.list}>
              <li>Verify your identity for secure access to your lending or borrowing account.</li>
              <li>Track loan applications, agreements, and repayment schedules.</li>
              <li>Analyze platform usage to improve features like loan matching or payment tracking.</li>
              <li>Save your preferences for a tailored experience, such as dashboard settings.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Managing Cookies</h2>
            <p className={styles.text}>
              You can control cookies through your browser settings to accept, block, or delete them. Disabling essential cookies may limit UniFund’s functionality, such as preventing you from accessing loan features. For guidance, check your browser’s help section or reach out via our <a href="/contact" className={styles.link}>Contact</a> page.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Cookie Consent</h2>
            <p className={styles.text}>
              When you first visit UniFund, we may display a cookie consent banner allowing you to choose which non-essential cookies to enable. You can update your preferences anytime in your account settings or browser. Continued use of UniFund implies consent to our essential cookies.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Policy Updates</h2>
            <p className={styles.text}>
              We may update this Cookie Policy to reflect changes in our lending platform or legal requirements. The latest version is always available here. Last updated: July 24, 2025.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cookies;