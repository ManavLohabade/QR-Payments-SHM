import { Button, Text, VStack } from '@chakra-ui/react'

interface WalletConnectorProps {
  onConnect: () => void;
  connectedAddress: string;
  balance: string;
}

const WalletConnector = ({ onConnect, connectedAddress, balance }: WalletConnectorProps) => (
  <VStack spacing={2} align="start">
    {!connectedAddress ? (
      <Button colorScheme="blue" onClick={onConnect}>
        Connect Wallet
      </Button>
    ) : (
      <>
        <Text>Connected Address: {connectedAddress}</Text>
        <Text>Balance: {balance} SHM</Text>
      </>
    )}
  </VStack>
);

export default WalletConnector; 