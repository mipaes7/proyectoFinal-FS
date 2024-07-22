import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About</h3>
          <p>
            This is a manga library app where you can keep track of mangas you are reading, plan to read, have finished, or dropped.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Manga Library. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
