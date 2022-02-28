import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <h4>Copyright &copy; 2022 By Yan Shiuh</h4>
      <Link to="/about">About</Link>
    </footer>
  );
}

export default Footer;
