import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
        
          <Col md={4} className="footer-section">
            <h5>O nas</h5>
            <p>
              Projekt inżynierski pionierskiego sklepu internetowego umożliwiającego wiele sposobów płatności.
              Naszym celem jest dostarczenie innowacyjnych rozwiązań zakupowych.
            </p>
          </Col>

          
          <Col md={4} className="footer-section">
            <h5>Zespół</h5>
            <ul className="footer-links">
              <li>Szymon Drapiński</li>
              <li>Maciej Adamski</li>
              <li>Jakub Cegłowski</li>
            </ul>
          </Col>
         
        </Row>
        <Row className="footer-bottom">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} CryptoShop. Wszelkie prawa zastrzeżone.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
};

export default Footer;
