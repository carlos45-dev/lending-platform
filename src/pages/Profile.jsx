import { useState, useEffect, useContext } from "react";
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
import { UserContext } from '../UserContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Profile() {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const auth = getAuth();
  const [image, setImage] = useState(localStorage.getItem('profilePicture') || user);

  // Check authentication and fetch profile picture
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate('/'); // Redirect to login if not authenticated
        return;
      }

      // Fetch profile picture from Firestore if not in local storage
      if (!localStorage.getItem('profilePicture') && userData?.uid) {
        try {
          const userRef = doc(db, 'users', userData.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists() && userSnap.data().profilePicture) {
            const profilePicture = userSnap.data().profilePicture;
            setImage(profilePicture);
            localStorage.setItem('profilePicture', profilePicture);
          } else {
            setImage(user);
            localStorage.setItem('profilePicture', user);
          }
        } catch (error) {
          console.error("Error fetching profile picture:", error);
          setImage(user);
          localStorage.setItem('profilePicture', user);
        }
      }
    });

    // Handle body styling
    const originalDisplay = document.body.style.display;
    document.body.style.display = "block";
    const originalColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#1A2258";

    return () => {
      document.body.style.display = originalDisplay;
      document.body.style.backgroundColor = originalColor;
      unsubscribe();
    };
  }, [userData, navigate, auth]);

  // Handle image upload to Firebase Storage and Firestore
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file && userData?.uid) {
      try {
        // Upload to Firebase Storage
        const storageRef = ref(storage, `profilePictures/${userData.uid}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // Update Firestore with the download URL
        const userRef = doc(db, 'users', userData.uid);
        await updateDoc(userRef, { profilePicture: downloadURL });

        // Update local storage and state
        localStorage.setItem('profilePicture', downloadURL);
        setImage(downloadURL);
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        alert("Failed to upload profile picture.");
      }
    }
  };

  // Handle share button
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
        <p className={styles.name}>{userData?.username || "N/A"}</p>

        <div className={styles.detailLeft}>
          <FontAwesomeIcon icon={faEnvelope} />
          <span>Email:</span>
          <p>{userData?.email || "N/A"}</p>
        </div>

        <div className={styles.detailLeft}>
          <FontAwesomeIcon icon={faPhone} />
          <span>Phone:</span>
          <p>{userData?.phone || "N/A"}</p>
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
            <FontAwesomeIcon icon={faInfoCircle} />
            <p>About Us</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;