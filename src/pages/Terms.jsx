import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Terms.module.css';
import { useEffect } from 'react';

function TermsPage() {
     useEffect(() => {
        const originalDisplay = document.body.style.display;
        document.body.style.display = 'block';
        return () => {
          document.body.style.display = originalDisplay;
        };
      }, []);
  return (
    <>
      <div className={styles.wrapper}>
        <main className={styles.termsSection}>
          <h2 className={styles.heading}>Terms and Conditions</h2>

          <section className={styles.block}>
            <h3>1. Eligibility</h3>
            <p>
              To use UniFund, you must be a registered student of the University of Malawi or a participating institution. 
              Verification of student identity may be required before accessing certain features.
            </p>
          </section>

          <section className={styles.block}>
            <h3>2. Loan Agreements</h3>
            <p>
              All loan agreements are made between individual students. UniFund does not act as a lender, borrower, 
              or financial institution. Users are solely responsible for negotiating, accepting, and repaying loans.
            </p>
          </section>

          <section className={styles.block}>
            <h3>3. Trust Ratings</h3>
            <p>
              Trust scores are calculated based on your loan repayment history. Late payments or missed deadlines 
              may lower your rating. This score may affect your visibility when requesting loans.
            </p>
          </section>

          <section className={styles.block}>
            <h3>4. Repayment Tracking</h3>
            <p>
              The platform allows lenders to monitor repayments. Borrowers are encouraged to mark payments once made.
              Lenders are responsible for confirming receipt of repayment.
            </p>
          </section>

          <section className={styles.block}>
            <h3>5. Disputes</h3>
            <p>
              UniFund does not mediate disputes between lenders and borrowers. Users are advised to keep proof 
              of all payments and communications.
            </p>
          </section>

          <section className={styles.block}>
            <h3>6. Code of Conduct</h3>
            <p>
              Users must treat others respectfully. Abuse, harassment, scams, or manipulation of trust scores 
              will lead to account suspension or removal.
            </p>
          </section>

          <section className={styles.block}>
            <h3>7. Changes to Terms</h3>
            <p>
              UniFund reserves the right to update these Terms at any time. Continued use of the platform 
              indicates acceptance of the latest Terms.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}

export default TermsPage;
