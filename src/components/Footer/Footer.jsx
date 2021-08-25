import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className="container">
        <div className={classes.footerInner}>
          <h2>SHOP</h2>
          <div className={classes.footerNetwork}>
            <i class="bx bxl-whatsapp"></i>
            <i class="bx bxl-instagram"></i>
            <i class="bx bxl-twitter"></i>
            <i class="bx bxl-vk"></i>
            <i class="bx bxl-telegram"></i>
            <i class="bx bxl-youtube"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
