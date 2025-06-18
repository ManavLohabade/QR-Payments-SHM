import { useState } from 'react'
import {
  Box,
  VStack,
  Button,
  Text,
  useToast,
  Card,
  CardBody,
  Heading,
  Input,
  HStack,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { getCurrentAddress, getMyBalance, sendTransaction } from '../utils/web3'
import WalletConnector from './common/WalletConnector'
import AmountInput from './common/AmountInput'
import QRCodeDisplay from './common/QRCodeDisplay'
import TransactionTable from './common/TransactionTable'

interface PaymentData {
  to: string
  value: string
  type: string
}

const CustomerView = () => {
  const [customerAddress, setCustomerAddress] = useState('')
  const [balance, setBalance] = useState('0')
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const toast = useToast()

  const connectWallet = async () => {
    try {
      const address = await getCurrentAddress()
      setCustomerAddress(address)
      const bal = await getMyBalance()
      setBalance(bal)
      toast({
        title: 'Wallet Connected',
        description: `Connected to ${address}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error: any) {
      console.error('Error connecting wallet:', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to connect wallet',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  // Mock function to scan QR code - replace with actual QR scanning
  const handleScanQR = () => {
    // This would normally use a QR scanner library
    // For demo, we'll simulate scanning a QR code
    const mockPaymentData: PaymentData = {
      to: '0x1234567890123456789012345678901234567890',
      value: ethers.utils.parseEther('0.1').toString(),
      type: 'payment'
    }
    setPaymentData(mockPaymentData)
  }

  // Function to send payment
  const sendPayment = async () => {
    if (!paymentData || !customerAddress) return

    setIsProcessing(true)
    try {
      const tx = await sendTransaction(paymentData.to, ethers.utils.formatEther(paymentData.value))

      toast({
        title: 'Transaction Sent',
        description: `Transaction hash: ${tx.hash}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      // Wait for transaction confirmation
      await tx.wait()
      
      toast({
        title: 'Payment Successful',
        description: 'Transaction confirmed!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      // Update balance
      const newBalance = await getMyBalance()
      setBalance(newBalance)
      
      // Clear payment data
      setPaymentData(null)
    } catch (error: any) {
      console.error('Error sending payment:', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to send payment',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <VStack spacing={6} align="stretch">
      <Card>
        <CardBody>
          <VStack spacing={4}>
            <Heading size="md">Customer Payment</Heading>
            <WalletConnector
              onConnect={connectWallet}
              connectedAddress={customerAddress}
              balance={balance}
            />
            {customerAddress && (
              <>
                <Button colorScheme="purple" onClick={handleScanQR}>
                  Scan QR Code
                </Button>
                {paymentData && (
                  <Card variant="outline" w="full">
                    <CardBody>
                      <VStack spacing={3} align="stretch">
                        <Text>Payment Details:</Text>
                        <Text>To: {paymentData.to}</Text>
                        <Text>Amount: {ethers.utils.formatEther(paymentData.value)} SHM</Text>
                        <Button
                          colorScheme="green"
                          onClick={sendPayment}
                          isLoading={isProcessing}
                          loadingText="Processing..."
                        >
                          Send Payment
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                )}
              </>
            )}
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  )
}

export default CustomerView 