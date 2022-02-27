import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo dog.svg";

import styles from "./styles/Header.module.css";

function Header() {
  return (
    <nav className={styles.container}>
      <Link to="/home" className={styles.link}>
        <img src={Logo} alt="logo" className={styles.img} />
      </Link>
    </nav>
  );
};

export default Header;