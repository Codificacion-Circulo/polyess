import { Fragment, useState, useEffect } from "react"
import './Header.css'
import logo from "../../logo.svg";
import { Navbar, Container, Nav, Toast, ToastContainer } from 'react-bootstrap';
import ConnectModal from '../../components/misc/connect/ConnectModal'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { useEagerConnect } from '../../library/hooks'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'

const changeNetwork = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }],
      });
    } catch (error) {
      console.error(error);
    }
  }
};
function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return {
      title: "Metmask Not Found",
      msg: 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
    }
  } else if (error instanceof UnsupportedChainIdError) {
    changeNetwork()
    return {
      title: "Unsupported Network",
      msg: "You're connected to an unsupported network."
    }
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return {
      title: "Wallet Connect Request Rejected",
      msg: 'Please authorize this website to access your Ethereum account.'
    }
  } else {
    console.error(error)
    return {
      title: 'Unknown Error',
      msg: 'An unknown error occurred. Check the console for more details.'
    }
  }
}


function Header(props) {
  const context = useWeb3React()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context
  const triedEager = useEagerConnect()
  const [modal, setModal] = useState(false);
  const closeModalHandler = (props) => {
    setModal(false);
  }
  const openModalHandler = (props) => {
    setModal(true);
  }
  return (
    <Fragment>
      {modal && (<ConnectModal onClose={closeModalHandler} open={modal} tried={triedEager} />)}
      <Navbar sticky="top" style={{ backgroundColor: " #e3f2fd" }} expand="lg">
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="justify-content-center align-items-center text-center" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="justify-content-center">
              <Nav.Link className="hover-underline-animation mx-3 text-center text-dark" href="/">Home</Nav.Link>
              <Nav.Link className="hover-underline-animation mx-3 text-center text-dark" href="/game">Play</Nav.Link>
              <Nav.Link className="hover-underline-animation mx-3 text-center text-dark" href="/leaderboard">Leaderboard</Nav.Link>
              <Nav.Link className="hover-underline-animation mx-3 text-center text-dark" href="/market">Marketplace</Nav.Link>
              <Nav.Link className="hover-underline-animation mx-3 text-center text-dark" href="/profile">Profile</Nav.Link>
              <Nav.Link className="hover-underline-animation mx-3 text-center text-dark" href="/faq">Faq</Nav.Link>
              <button onClick={openModalHandler} className="btn btn-primary">{account === null
                ? 'Network Connected'
                : account
                  ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
                  : 'Connect'}</button>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {error &&
        <ToastContainer className="p-3" position='middle-end'>
          <Toast show={true} onClose={() => { deactivate(); openModalHandler() }} className="d-inline-block m-1" bg='danger' key='Danger'>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
              <strong className="me-auto">{getErrorMessage(error).title}</strong>
              <small>Just Now</small>
            </Toast.Header>
            <Toast.Body>
              {getErrorMessage(error).msg}
            </Toast.Body>
          </Toast>
        </ToastContainer>}
    </Fragment>
  )
}



export default Header

