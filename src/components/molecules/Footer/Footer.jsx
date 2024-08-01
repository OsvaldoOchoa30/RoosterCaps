import React from "react";
import { FaFacebook } from "react-icons/fa"; //
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <div>
      <footer className={styles.footer}>
        <a
          href="https://www.facebook.com/profile.php?id=61563260127358"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={50} style={{ color: "azure" }} />
        </a>

        <a
          href="https://www.instagram.com/rooster.caps/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={50} style={{ color: "azure" }} />
        </a>

        <a
        href="https://www.tiktok.com/@roostercaps2"
        target="_blank"
        rel="noopener noreferrer"
        >
        <FaTiktok size={50} style={{ color: "azure" }} />
        </a>
      </footer>
    </div>
  );
}

export default Footer;
