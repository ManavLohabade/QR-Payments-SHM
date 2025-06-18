import { Box } from '@chakra-ui/react'
import { QRCodeSVG } from 'qrcode.react'

interface QRCodeDisplayProps {
  value: string;
}

const QRCodeDisplay = ({ value }: QRCodeDisplayProps) => (
  <Box p={4} bg="white" borderRadius="md">
    <QRCodeSVG value={value} size={200} />
  </Box>
);

export default QRCodeDisplay; 