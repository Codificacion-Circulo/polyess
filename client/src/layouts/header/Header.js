import React from 'react'
import './Header.css'
import logo from "../../logo.svg";
import {Navbar,Container,Nav} from 'react-bootstrap';

function Header(props) {
    return (
        <Navbar sticky="top" style={{backgroundColor:" #e3f2fd"}} expand="lg">
        <Container>
        <Navbar.Brand href="/home">
        <img
          alt=""
          src={logo}
          width="60"
          height="60"
          className="d-inline-block align-center"
        />{' '}
      polyess
      </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="justify-content-center align-items-center text-center"/>
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="justify-content-center">
              <Nav.Link className="hover-underline-animation mx-3 text-center text-dark" href="/">Home</Nav.Link>
              <Nav.Link className="hover-underline-animation mx-3 text-center text-dark" href="/game">Play</Nav.Link>
              <Nav.Link className="hover-underline-animation mx-3 text-center text-dark" href="/leaderboard">Leaderboard</Nav.Link>
              <Nav.Link className="hover-underline-animation mx-3 text-center text-dark" href="/market">Marketplace</Nav.Link>
              <Nav.Link className="hover-underline-animation mx-3 text-center text-dark" href="/profile">Profile</Nav.Link>
              <Nav.Link className="hover-underline-animation mx-3 text-center text-dark" href="/faq">Faq</Nav.Link>


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}



export default Header

