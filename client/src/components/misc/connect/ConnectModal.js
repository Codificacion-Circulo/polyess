import {Fragment,useState,useEffect} from "react"
import {Modal,Button} from 'react-bootstrap'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { injected, network, walletconnect } from '../../../library/connector'
import { useInactiveListener } from '../../../library/hooks'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import classes from './ConnectModal.css';
import meta from '../../../assets/connectModal/metamask.svg'
import wltcnct from '../../../assets/connectModal/walletconnect.svg'
import net from '../../../assets/connectModal/network.svg'

const ConnectorNames = {
    Injected : 'MetaMask',
    Network : 'Network',
    WalletConnect : 'WalletConnect'
  };
  Object.freeze(ConnectorNames)
  const connectorsByName = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.Network]: network,
    [ConnectorNames.WalletConnect]: walletconnect
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
        >
          <Modal.Header closeButton>
          {!!error && <Modal.Title>{getErrorMessage(error)}
        </Modal.Title>}
          </Modal.Header>
          <Modal.Body>
                    
    {Object.keys(connectorsByName).map((name) => {
          const currentConnector = connectorsByName[name]
          const activating = currentConnector === activatingConnector
          const connected = currentConnector === connector
          const disabled = !triedEager || !!activatingConnector || connected || !!error
          console.log(disabled);

          return (
           <div className={classes.modal}>
           {activating && (<LoadingSpinner/>)}
           <div className={classes.modal_btn}>
            <button
              disabled={disabled}
              key={name}
              className="btn btn-primary"
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
              {/* {name==='MetaMask' && (<img src={meta} alt=""/>)}
            {name==='WalletConnect' && (<img src={wltcnct} alt=""/>)}
            {name==='Network' && (<img src={net} alt=""/>)} */}
              
            </button>
    </div>
           </div>
           
          )
        })}
      
     


          </Modal.Body>
          <Modal.Footer>
          <div>
        {(active || error) && (
          <button className="btn btn-primary"
            onClick={() => {
              deactivate()
            }}
          >
            Deactivate
          </button>
        )}
      </div>

  
      <div>
        {/* {!!(library && account) && (
          <button
            onClick={() => {
              library
                .getSigner(account)
                .signMessage('👋')
                .then((signature) => {
                  window.alert(`Success!\n\n${signature}`)
                })
                .catch((error) => {
                  window.alert('Failure!' + (error && error.message ? `\n\n${error.message}` : ''))
                })
            }}
          >
            Sign Message
          </button>
        )} */}
        {!!(connector === connectorsByName[ConnectorNames.Network] && chainId) && (
          <button className="btn btn-primary"
            onClick={() => {
              ;(connector).changeChainId(chainId === 1 ? 4 : 1)
            }}
          >
            Switch Networks
          </button>
        )}
        {connector === connectorsByName[ConnectorNames.WalletConnect] && (
          <button className="btn btn-primary"
          
            onClick={() => {
              ;(connector).close()
            }}
          >
            Kill WalletConnect Session
          </button>
        )}
      </div>
            <Button variant="secondary" onClick={props.onClose}>
              Close
            </Button>
            {/* <Button variant="primary">Understood</Button> */}
          </Modal.Footer>
        </Modal>
    )
}


export default ConnectModal;

