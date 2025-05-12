import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/injected-wallets'
import coinbaseModule from '@web3-onboard/injected-wallets'

const injected = injectedModule()
const walletConnect = walletConnectModule()
const coinbase = coinbaseModule()

const onboard = Onboard({
  wallets: [injected, walletConnect, coinbase],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: 'https://mainnet.infura.io/v3/<YOUR_INFURA_KEY>'
    },
    {
        id: '137',
        token: 'POL',
        label: 'Polygon Mainnet',
        rpcUrl: 'https://polygon-rpc.com/'
    },
    {
        id: '56',
        token: 'BNB',
        label: 'Binance Smart Chain Mainnet',
        rpcUrl: 'https://bsc-dataseed.binance.org/'
    },
    {
        id: '43114',
        token: 'AVAX',
        label: 'Avalanche Mainnet',
        rpcUrl: 'https://api.avax.network/ext/bc/C/rpc'
    }
    
  ],
  appMetadata: {
    name: 'Logo',
    icon: '<svg></svg>',
    description: 'Conecta tu wallet para usar Logo'
  },
  theme: 'dark'
})

export default onboard