import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/injected-wallets'
import coinbaseModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers';

const injected = injectedModule()
const walletConnect = walletConnectModule()
const coinbase = coinbaseModule()

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_URL as string
if (!alchemyApiKey) {
  throw new Error('Alchemy API key is not defined in environment variables')
}

const onboard = Onboard({
  wallets: [injected, walletConnect, coinbase],
  chains: [
    {
      id: '11155111',
      token: 'ETH',
      label: 'Ethereum Sepolia Testnet',
      rpcUrl: alchemyApiKey
    }
  ],
  appMetadata: {
    name: 'Logo',
    icon: 'data:image/svg+xml:base64;PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iODY2LjAwMDAwMHB0IiBoZWlnaHQ9IjY1MC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDg2Ni4wMDAwMDAgNjUwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsNjUwLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTQyNDYgNTU0OSBjLTExOCAtMTYgLTE5MSAtNDkgLTU0NiAtMjU0IC0xMDA0IC01NzggLTExNzkgLTY4MAotMTIyMCAtNzE0IC05NSAtODAgLTE3MiAtMTk3IC0yMTcgLTMzMSAtMTcgLTUxIC0xOCAtMTE3IC0yMSAtOTc0IC0zIC04OTYgLTIKLTkyMSAxOCAtMTAwMCAzNyAtMTQ5IDExNiAtMjczIDIzMiAtMzY2IDMyIC0yNSAxMzcgLTkxIDIzNSAtMTQ3IDE0MyAtODEgNDY2Ci0yNjcgNjQ4IC0zNzMgNTE0IC0yOTggNjk3IC0zOTggNzY1IC00MTcgMTAyIC0zMCAxODIgLTM3IDI3MyAtMjQgMTQ5IDIxIDEyMwo3IDkxNyA0NjYgMzc1IDIxNiA1ODQgMzM2IDY5NCAzOTggMjEwIDEyMCAzMzIgMjY3IDM4MSA0NjIgMTMgNTEgMTUgMTkxIDE1Cjk3NSAwIDEwMjIgNCA5NjYgLTcyIDExMjAgLTMyIDY3IC01OCAxMDIgLTEyMiAxNjYgLTY4IDY3IC0xMDcgOTUgLTI0MSAxNzEKLTg4IDUwIC0yNTkgMTQ4IC0zODAgMjE4IC0yMTQgMTI0IC02MzkgMzY5IC04NzggNTA2IC0xODcgMTA3IC0zMTYgMTM5IC00ODEKMTE4eiBtMTU1IC0zMzQgYzM1IC00IDE0MSAtNjAgNDYwIC0yNDMgMjI4IC0xMzEgNTU5IC0zMjEgNzM2IC00MjMgMTc3IC0xMDEKMzIyIC0xODcgMzIzIC0xOTAgMCAtNSAtMzkwIC0yMzcgLTEwMjUgLTYwOSAtNDQgLTI2IC0xODkgLTExMSAtMzIyIC0xODkKbC0yNDIgLTE0MiAtMzQ4IDIwNSBjLTE5MSAxMTMgLTM0OSAyMDkgLTM1MCAyMTMgLTIgNSA5IDE2IDI0IDI0IDEzMiA3NSA0NzkKMjc1IDU2NiAzMjUgbDEwNyA2MyA5NSAtNTQgYzUyIC0zMCAxMzggLTgwIDE5MCAtMTEwIDUzIC0zMCA5OCAtNTUgMTAxIC01NQoxMSAwIDMxNCAxODMgMzE0IDE5MCAwIDQgLTEzMCA4MyAtMjkwIDE3NSAtNDEyIDIzNyAtNDA5IDIzNyAtNzM3IDQ3IC0xMDQKLTYxIC0zMDYgLTE3OCAtNDUwIC0yNjEgbC0yNjEgLTE1MSAtMTY0IDk3IGMtODkgNTMgLTIxNCAxMjcgLTI3NiAxNjQgbC0xMTMKNjcgNTggMzUgYzMyIDE5IDE5MSAxMTEgMzUzIDIwNCAxNjIgOTMgNDY0IDI2NiA2NzAgMzg1IDIwNyAxMTkgMzk0IDIyMSA0MTUKMjI3IDUwIDE0IDg2IDE5IDEwNSAxNSA4IC0xIDM2IC01IDYxIC05eiBtLTExOTEgLTE1MjAgYzM0NCAtMjAyIDcwMCAtNDEzCjc5MyAtNDY3IGwxNjcgLTEwMCAwIC0zODkgYzAgLTIxNCAtMiAtMzg5IC02IC0zODkgLTMgMCAtMTQzIDgwIC0zMTIgMTc3Ci0xNjkgOTcgLTMyNiAxODcgLTM0OSAyMDEgbC00MyAyNCAwIDIwMSAwIDIwMiAtMTQzIDg0IGMtNzggNDcgLTE1MiA5MSAtMTY1Cjk5IGwtMjMgMTUgMyAtMzM5IDMgLTMzOSAzMyAtNjggYzIxIC00MiA0OSAtODAgNzUgLTEwMiAyMyAtMTkgMTg2IC0xMTcgMzYyCi0yMTkgMTc2IC0xMDEgMzc0IC0yMTUgNDQwIC0yNTMgbDEyMCAtNjkgMyAtMzIyIGMxIC0xNzcgMCAtMzIyIC0zIC0zMjIgLTIgMAotNDggMjUgLTEwMiA1NyAtNTQgMzEgLTE4NiAxMDcgLTI5MyAxNjggLTEwNyA2MiAtMjQwIDEzOCAtMjk1IDE3MCAtMTg4IDEwOQotNDgwIDI3NyAtNjE1IDM1MyAtMTc3IDEwMCAtMjQwIDE2MCAtMjY5IDI1NiAtMjEgNjcgLTIxIDg0IC0yMSA5MDggMCA0NjEgMwo4MzcgOCA4MzUgNCAtMiAyODggLTE3MCA2MzIgLTM3MnogbTI4ODAgLTQ4MCBjMCAtOTI5IDIgLTg4OSAtNjIgLTk4MiAtNDEKLTYxIC0yIC0zNyAtNzE4IC00NDggLTExMyAtNjUgLTMyNiAtMTg3IC00NzUgLTI3MyAtMTQ4IC04NSAtMjg1IC0xNjMgLTMwMgotMTc0IGwtMzMgLTIwIDAgOTA5IDAgOTA4IDE1OCA5MiBjODYgNTAgMjQyIDE0MSAzNDYgMjAyIDEwNCA2MSAxOTAgMTExIDE5MgoxMTEgMiAwIDQgLTE3NyA0IC0zOTQgbDAgLTM5NSAtODIgLTQ5IGMtNDYgLTI2IC0xMjcgLTc0IC0xODAgLTEwNiBsLTk4IC01NwowIC0xOTAgMCAtMTkxIDMzIDIwIGMzMyAyMCA0MDkgMjM3IDQ4MyAyNzkgNTUgMzEgMTIwIDEwMyAxNDcgMTYxIDIyIDQ2IDIyCjU4IDI1IDU4NCBsMyA1MzcgOTcgNTcgYzM0MiAyMDIgNDQ4IDI2MyA0NTUgMjY0IDQgMCA3IC0zODAgNyAtODQ1eiIvPgo8L2c+Cjwvc3ZnPgo=',
    description: 'Conecta tu wallet para usar Logo'
  },
  theme: 'dark'
})

// Función para registrar la wallet del usuario en la base de datos
async function registerWallet(address: string) {
  try {
    const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch('/api/wallet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ address })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al registrar la wallet');
    }

    console.log('Wallet registrada exitosamente');
  } catch (error) {
    console.error('Error al registrar la wallet:', error);
    throw error;
  }
}

// Function to get the connected wallet's address
export async function getConnectedWallet() {
  const wallets = await onboard.connectWallet();
  if (wallets.length === 0) {
    throw new Error('No wallet connected');
  }

  const address = wallets[0].accounts[0].address;

  // Registrar la wallet en la base de datos
  await registerWallet(address);

  return address;
}

// Function to get the signer for the connected wallet
export async function getSigner() {
  const wallets = await onboard.connectWallet();
  if (wallets.length === 0) {
    throw new Error('No wallet connected');
  }

  const provider = new ethers.BrowserProvider(wallets[0].provider, 'any');
  return provider.getSigner();
}

// Function to connect the contract with the user's signer
export async function getContractWithSigner(contractAddress: string, abi: any) {
  const signer = await getSigner();
  return new ethers.Contract(contractAddress, abi, signer);
}

export default onboard