// src/HomePage.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './HomePage.css'; // Import custom stylesheet

const HomePage = () => {
  return (
    <div className="home-page">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={8}>
            <Card className="text-center">
              <Card.Header className="header">Welcome to ShiftClock</Card.Header>
              <Card.Body>
                <Card.Title className="title">A simple application to manage your shift schedule and time sheets.</Card.Title>
                <div className="button-container">
                  <Button variant="primary" href="/signup">Sign Up</Button>{' '}
                  <Button variant="outline-primary" href="/login">Login</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;


