import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { ethers } from 'ethers'

interface Transaction {
  hash: string
  from: string
  value: string
  status: 'pending' | 'confirmed' | 'failed'
}

interface TransactionTableProps {
  transactions: Transaction[]
}

const TransactionTable = ({ transactions }: TransactionTableProps) => (
  <Table variant="simple">
    <Thead>
      <Tr>
        <Th>Hash</Th>
        <Th>From</Th>
        <Th>Amount</Th>
        <Th>Status</Th>
      </Tr>
    </Thead>
    <Tbody>
      {transactions.length === 0 ? (
        <Tr><Td colSpan={4}>No transactions yet.</Td></Tr>
      ) : (
        transactions.map((tx) => (
          <Tr key={tx.hash}>
            <Td>{tx.hash.slice(0, 8)}...</Td>
            <Td>{tx.from.slice(0, 8)}...</Td>
            <Td>{ethers.utils.formatEther(tx.value)} SHM</Td>
            <Td>{tx.status}</Td>
          </Tr>
        ))
      )}
    </Tbody>
  </Table>
)

export default TransactionTable; 