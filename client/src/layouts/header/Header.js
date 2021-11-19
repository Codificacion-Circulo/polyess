import {Fragment,useState,useEffect} from "react"
import './Header.css'
import logo from "../../logo.svg";
import {Navbar,Container,Nav} from 'react-bootstrap';
import ConnectModal from '../../components/misc/connect/ConnectModal'
import LoadingSpinner from '../../components/misc/LoadingSpinner/LoadingSpinner'



function Header(props) {
  const [modal, setModal] = useState(false);
  const closeModalHandler = (props) => {
    setModal(false);
  }
  const openModalHandler = (props) => {
    setModal(true);
  }
    return (
      <Fragment>
      {modal && <LoadingSpinner />}
      {modal && (<ConnectModal title='Message Submitted!' onClose={closeModalHandler} open={modal} />)}
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
              <button onClick={openModalHandler} className="btn btn-primary">Connect</button>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </Fragment>
    )
}



export default Header

