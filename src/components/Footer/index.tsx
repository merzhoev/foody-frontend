import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <a href="#" className="footer__logo">
            foody
          </a>
          <p className="footer__author">
            Made with <span className="footer__author-heart">❤️</span> by{' '}
            <a className="footer__author-link" href="https://github.com/merzhoev" target="_blank">
              merzhoev
            </a>
          </p>
          <p className="footer__copyright">&copy; 2022 Foody. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};
