import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'





var RPC_URLS = {
    1: 'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
    4: 'https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213'
};


// export const injected = new InjectedConnector({ supportedChainIds: [1, 3,4, 5, 42] })
export const injected = new InjectedConnector({ supportedChainIds: [1] })





export const network = new NetworkConnector({
    urls: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
    defaultChainId: 1
  })


  export const walletconnect = new WalletConnectConnector({
    rpc: { 1: RPC_URLS[1] },
    qrcode: true
  })
  