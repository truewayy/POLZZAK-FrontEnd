import { Progress } from '@chakra-ui/react';

interface ProgressBarProps {
  currentValue: number;
  totalValue: number;
}

const ProgressBar = ({ currentValue, totalValue }: ProgressBarProps) => (
  <Progress
    value={(currentValue / totalValue) * 100}
    borderRadius="8px"
    height="16px"
    colorScheme="blue"
    bg="gray.200"
  />
);

export default ProgressBar;
