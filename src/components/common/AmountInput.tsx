import { Input } from '@chakra-ui/react'

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const AmountInput = ({ value, onChange, placeholder }: AmountInputProps) => (
  <Input
    placeholder={placeholder || 'Enter amount'}
    value={value}
    onChange={e => onChange(e.target.value)}
    type="number"
  />
);

export default AmountInput; 