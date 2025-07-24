import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/FAQs.module.css';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function FAQs() {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };
   useEffect(() => {
                      const originalDisplay = document.body.style.display;
                      document.body.style.display = 'block';
                      return () => {
                      document.body.style.display = originalDisplay;
                        };
           }, []);

  const faqs = {
    General: [
      {
        question: 'What is UniFund?',
        answer:
          'UniFund is a peer-to-peer lending platform designed for students. It allows students to borrow and lend money with transparency, track repayments, and build trust within the community.',
      },
      {
        question: 'Who can use UniFund?',
        answer:
          'UniFund is available to registered students at participating universities. ',
      },
    ],
    Borrowing: [
      {
        question: 'How do I apply for a loan?',
        answer:
          'Navigate to the "Borrow Money" section, find lenders who are offering loans, fill out the loan application form, and submit it for review. You’ll be matched with lenders based on your request and profile.',
      },
      {
        question: 'What are the interest rates for borrowing?',
        answer:
          'Interest rates vary depending on the agreement between borrowers and lenders.The lenders provide interest on their terms .',
      },
    ],
    Lending: [
      {
        question: 'How can I lend money on UniFund?',
        answer:
          'Go to the "Lend Money" section, browse loan requests, and select the ones you want to fund. You can set your preferred interest rate and terms by adding offers.',
      },
      {
        question: 'Is lending safe on UniFund?',
        answer:
          'UniFund verifies all users and provides a transparent repayment tracking system. However, as lending comes with a risk of default, lenders should be prepared to handle potential losses and lenders will be fully responsible .',
      },
    ],
    Payments: [
      {
        question: 'How do I track my payments?',
        answer:
          'Use the "Track Payments" feature to view your repayment schedule, upcoming payments, and payment history. You’ll receive notifications for due dates.',
      },
      {
        question: 'What happens if I miss a payment?',
        answer:
          'Missing a payment or making a late payment costs you a trust score and may affect your ability to receive funds. Ensure you pay on time to maintain a positive reputation.',
      },
    ],
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <div className={styles.faqContainer}>
          {Object.keys(faqs).map((category) => (
            <div key={category} className={styles.category}>
              <button
                className={styles.categoryHeader}
                onClick={() => toggleCategory(category)}
              >
                {category}
                <FontAwesomeIcon
                  icon={openCategory === category ? faChevronUp : faChevronDown}
                  className={styles.icon}
                />
              </button>
              {openCategory === category && (
                <div className={styles.questions}>
                  {faqs[category].map((faq, index) => (
                    <div key={index} className={styles.question}>
                      <h3 className={styles.questionText}>{faq.question}</h3>
                      <p className={styles.answer}>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <footer>
<Footer />
      </footer>
      
    </>
  );
}

export default FAQs;