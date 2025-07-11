import { useState, useEffect} from "react";
import styles from "../styles/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faSignOutAlt, faShareAlt, faInfoCircle, faCamera, faPhone,faLock } from "@fortawesome/free-solid-svg-icons";
import user  from '../assets/user.jfif';

function Profile() {
  const [image, setImage] = useState(user);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

   //resetting the display settings
   useEffect(() => {
                 const originalDisplay = document.body.style.display;
                 document.body.style.display = 'block';
                 const originalColor = document.body.style.backgroundColor;
                 document.body.style.backgroundColor = '#1A2258';
                 return () => {
                 document.body.style.display = originalDisplay;
                 document.body.style.backgroundColor = originalColor;
                   };
      }, []);
     return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Profile</h1>

      <div className={styles.imageWrapper}>
        <img
          src={image || "https://via.placeholder.com/150"}
          alt="Profile"
          className={styles.profileImage}
        />
        <label htmlFor="imageUpload" className={styles.uploadBtn}>
          <FontAwesomeIcon icon={faCamera} />
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          hidden
        />
      </div>


     <div className={styles.information}>
      <p className={styles.name}>Carlos Muleke</p>
      <div className={styles.detail}>
        <FontAwesomeIcon icon={faEnvelope} />
        <p>example2@gmail.com</p>
      </div>

      <div className={styles.detail}>
        <FontAwesomeIcon icon={faPhone} />
        <p>+265992779377</p>
      </div>

      <div className={styles.actions}>

        <div>
          <FontAwesomeIcon icon={faLock} />
          <p>Reset Password</p>
        </div>

        <div>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <p>Log Out</p>
        </div>

        <div>
          <FontAwesomeIcon icon={faShareAlt} />
          <p>Share</p>
        </div>

        <div>
          <FontAwesomeIcon icon={faInfoCircle} />
          <p>About Us</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
