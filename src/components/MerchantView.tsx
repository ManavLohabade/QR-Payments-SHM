import { useState, useEffect } from 'react'
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  useToast,
  Card,
  CardBody,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { QRCodeSVG } from 'qrcode.react'
import { ethers } from 'ethers'
import { getCurrentAddress, getMyBalance } from '../utils/web3'
import WalletConnector from './common/WalletConnector'
import AmountInput from './common/AmountInput'
import QRCodeDisplay from './common/QRCodeDisplay'
import TransactionTable from './common/TransactionTable'

interface Transaction {
  hash: string
  from: string
  value: string
  timestamp: number
  status: 'pending' | 'confirmed' | 'failed'
}

const MerchantView = () => {
  const [amount, setAmount] = useState('')
  const [merchantAddress, setMerchantAddress] = useState('')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [balance, setBalance] = useState('0')
  const [showQR, setShowQR] = useState(false)
  const toast = useToast()

  const connectWallet = async () => {
    try {
      const address = await getCurrentAddress()
      setMerchantAddress(address)
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

  // Generate payment data for QR code
  const generatePaymentData = () => {
    if (!merchantAddress || !amount) return ''
    try {
      // Use parseUnits for more precise handling if needed, but parseEther is fine for whole SHM
      ethers.utils.parseEther(amount) 
      return JSON.stringify({
        to: merchantAddress,
        value: ethers.utils.parseEther(amount).toString(),
        type: 'payment'
      })
    } catch (error) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid number for the amount.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return ''
    }
  }

  return (
    <VStack spacing={6} align="stretch">
      <Card>
        <CardBody>
          <VStack spacing={4}>
            <Heading size="md">Merchant Dashboard</Heading>
            <WalletConnector
              onConnect={connectWallet}
              connectedAddress={merchantAddress}
              balance={balance}
            />
            {merchantAddress && (
              <>
                <HStack>
                  <AmountInput
                    placeholder="Enter amount in SHM"
                    value={amount}
                    onChange={(val) => {
                      setAmount(val)
                      setShowQR(false)
                    }}
                  />
                  <Button colorScheme="green" onClick={() => {
                    if (!amount || !merchantAddress || !generatePaymentData()) return;
                    setShowQR(true);
                  }}>
                    Generate QR
                  </Button>
                </HStack>
                {showQR && amount && merchantAddress && generatePaymentData() && (
                  <QRCodeDisplay value={generatePaymentData()} />
                )}
              </>
            )}
          </VStack>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <VStack spacing={4}>
            <Heading size="md">Transaction History</Heading>
            <TransactionTable transactions={transactions} />
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  )
}

export default MerchantView 