// src/components/Navbar/Navbar.js

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.css';
import { Link } from 'react-router-dom';

const NavigationBar = ({ isAuthenticated }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      {/* ... */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav.Item>
          {isAuthenticated && (
            <>
              <Nav.Item>
                <Link className="nav-link" to="/timesheet">
                  Time Sheet
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/manager-approval">
                  Manager Approval
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </Nav.Item>
            </>
          )}
        </Nav>
        <Nav>
          {!isAuthenticated && (
            <>
              <Nav.Item>
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
