import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faSignOutAlt,
  faShareAlt,
  faInfoCircle,
  faCamera,
  faPhone,
  faLock,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import user from "../assets/user.jfif";

function Profile() {
  const [image, setImage] = useState(user);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const shareWebsite = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "UniFund",
          text: "Check out this Website!",
          url: "https://unifund-lending-platform.netlify.app",
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

  useEffect(() => {
    const originalDisplay = document.body.style.display;
    document.body.style.display = "block";
    const originalColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#1A2258";
    return () => {
      document.body.style.display = originalDisplay;
      document.body.style.backgroundColor = originalColor;
    };
  }, []);

  return (
    <div className={styles.profileContainer}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className={styles.backArrow}
        onClick={() => navigate("/home")}
      />

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

        <div className={styles.detailLeft}>
          <FontAwesomeIcon icon={faEnvelope} />
          <span>Email:</span>
          <p>example2@gmail.com</p>
        </div>

        <div className={styles.detailLeft}>
          <FontAwesomeIcon icon={faPhone} />
          <span>Phone:</span>
          <p>+265992779387</p>
        </div>

        <div className={styles.actions}>
          <div>
            <FontAwesomeIcon icon={faLock} />
            <p>Reset Password</p>
          </div>
          <div onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <p>Log Out</p>
          </div>
          <div onClick={shareWebsite}>
            <FontAwesomeIcon icon={faShareAlt} />
            <p>Share</p>
          </div>
          <div onClick={() => navigate("/about")}>
            <FontAwesomeIcon icon={faInfoCircle}  />
            <p>About Us</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
