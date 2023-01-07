import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="footer  p-32 bg-black text-white print:hidden">
      <div>
        <img src={logo} alt="" />
        <p>
          ACME Industries Ltd.
          <br />
          Providing reliable tech since 1992
        </p>
      </div>
      <div>
        <span className="footer-title">Services</span>
        <Link href="" className="link link-hover">
          Branding
        </Link>
        <Link href="" className="link link-hover">
          Design
        </Link>
        <Link href="" className="link link-hover">
          Marketing
        </Link>
        <Link href="" className="link link-hover">
          Advertisement
        </Link>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <Link href="" className="link link-hover">
          About us
        </Link>
        <Link href="" className="link link-hover">
          Contact
        </Link>
        <Link href="" className="link link-hover">
          Jobs
        </Link>
        <Link href="" className="link link-hover">
          Press kit
        </Link>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <Link href="" className="link link-hover">
          Terms of use
        </Link>
        <Link href="" className="link link-hover">
          Privacy policy
        </Link>
        <Link href="" className="link link-hover">
          Cookie policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
