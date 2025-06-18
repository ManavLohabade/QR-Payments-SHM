import { ethers } from 'ethers'

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not detected. Please install MetaMask.");
  }
  return new ethers.providers.Web3Provider(window.ethereum);
};

export const getCurrentAddress = async (): Promise<string> => {
  const provider = getProvider();
  const accounts = await provider.send('eth_requestAccounts', []);
  if (accounts.length === 0) {
    throw new Error("No accounts found. Please connect your wallet.");
  }
  return accounts[0];
};

export const getBalanceOf = async (address: string): Promise<string> => {
  const provider = getProvider();
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
};

export const getMyBalance = async (): Promise<string> => {
  const myAddress = await getCurrentAddress();
  return await getBalanceOf(myAddress);
};

export const sendTransaction = async (to: string, value: string) => {
  const provider = getProvider();
  const signer = provider.getSigner();
  
  const tx = await signer.sendTransaction({
    to,
    value: ethers.utils.parseEther(value),
  });
  return tx;
}; 