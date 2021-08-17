import React, { ReactElement } from 'react';

const Footer = (): ReactElement => (
  <footer className="footer">
    <div className="footer-container">
      <a
        className="github"
        href="https://github.com/foggylight"
        target="_blank"
        rel="noopener noreferrer"
      >
        github
      </a>
      <a className="rss" href="https://rs.school/js/" target="_blank" rel="noopener noreferrer">
        <span className="rss-year">&apos;21</span>
      </a>
    </div>
  </footer>
);

export default Footer;
