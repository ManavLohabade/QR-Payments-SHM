import { useState } from 'react'
import { Box, VStack, Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import MerchantView from './components/MerchantView'
import CustomerView from './components/CustomerView'

function App() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Box minH="100vh" bg="gray.50" py={8}>
      <VStack gap={8} maxW="1200px" mx="auto" px={4}>
        <Heading>SHM QR Payment System</Heading>
        
        <Tabs isFitted variant="enclosed" w="full" onChange={(index: number) => setActiveTab(index)}>
          <TabList mb="1em">
            <Tab>Merchant View</Tab>
            <Tab>Customer View</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <MerchantView />
            </TabPanel>
            <TabPanel>
              <CustomerView />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  )
}

export default App
