import React from "react";
import { Link } from "react-router-dom";
import video from "../images/pexels-yan-5478927.mp4";

import styles from "./styles/Landing.module.css";


export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <Link to="/home" className={styles.title}>
          <h1>Welcome</h1>
        </Link>
      </div>
      
      <video className={styles.background} muted autoPlay loop src={video} />
    </div>
  );
};