import React from 'react';
import { Container } from './styles';

function Footer() {
  return (
    <Container className="footer">
      <>
        <a href="/politica-privacidade" className="topbar__logo">
          <p className="footer-container">Politica de privacidade</p>
        </a>
        <p className="footer-container">© Site do Bem 2020</p>
      </>
    </Container>
  );
}

export default Footer;
