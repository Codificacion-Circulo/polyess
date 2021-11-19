import {Fragment,useState,useEffect} from "react"
import './Header.css'
import logo from "../../logo.svg";
import {Navbar,Container,Nav} from 'react-bootstrap';
import ConnectModal from '../../components/misc/connect/ConnectModal'
import LoadingSpinner from '../../components/misc/LoadingSpinner/LoadingSpinner'
import { useWeb3React, UnsupportedChainIdError} from '@web3-react/core'
import { useEagerConnect } from '../../library/hooks'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}


function Header(props) {
  const { account,error } = useWeb3React()
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
              <button onClick={openModalHandler} className="btn btn-primary">{account === null
          ? 'Netwrok Connected'
          : account
          ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
          : 'No Wallet Attached!!'}</button>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </Fragment>
    )
}



export default Header

