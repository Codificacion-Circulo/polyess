import { Fragment, useState, useEffect } from "react"
import { Modal, Button } from 'react-bootstrap'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  injected, network, walletconnect, walletlink,
  // ledger
} from '../../../library/connector'
import { useInactiveListener } from '../../../library/hooks'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import classes from './ConnectModal.css';
import meta from '../../../assets/connectModal/metamask.svg'
import wltcnct from '../../../assets/connectModal/walletconnect.svg'
import net from '../../../assets/connectModal/network.svg'

const ConnectorNames = {
  Injected: 'MetaMask',
  Network: 'Network',
  WalletConnect: 'WalletConnect',
  WalletLink: 'WalletLink',
  WalletLedger: 'Ledger'
};
Object.freeze(ConnectorNames)
const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.Network]: network,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.WalletLink]: walletlink,
  // [ConnectorNames.Ledger]: ledger
}

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




function ConnectModal(props) {
  const context = useWeb3React()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context

  const [activatingConnector, setActivatingConnector] = useState()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = props.tried

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)
  return (
    <Modal
      show={props.open}
      onHide={props.onClose}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {!!error && <Modal.Title id="contained-modal-title-vcenter">{getErrorMessage(error)}
        </Modal.Title>}
      </Modal.Header>
      <Modal.Body>

        {Object.keys(connectorsByName).map((name) => {
          const currentConnector = connectorsByName[name]
          const activating = currentConnector === activatingConnector
          const connected = currentConnector === connector
          const disabled = !triedEager || !!activatingConnector || connected || !!error
          console.log(disabled);
          if ((activating == true&&connected == true)||error) {
            props.onClose()
          }
          if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined
    }

          return (
            <Fragment>
              {activating && (<LoadingSpinner />)}

              <button
                disabled={disabled}
                key={name}
                className="btn btn-primary d-flex"
                onClick={() => {
                  setActivatingConnector(currentConnector)
                  activate(connectorsByName[name])
                }}
              >
                {connected && (
                  <span role="img" aria-label="check">
                    ✅
                  </span>
                )}
                {name}
                {/* {name==='MetaMask' && (<img className={{width: '5%'}} src={meta} alt=""/>)}
            {name==='WalletConnect' && (<img className={{width: '5%'}} src={wltcnct} alt=""/>)}
            {name==='Network' && (<img className={{width: '5%'}} src={net} alt=""/>)}
               */}
              </button>

            </Fragment>

          )
        })}




      </Modal.Body>
      <Modal.Footer>

        {(active || error) && (
          <Button variant="secondary"
            onClick={() => {
              deactivate()
            }}
          >
            Deactivate</Button>
        )}

        <div>
          
        </div>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}


export default ConnectModal;

