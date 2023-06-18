import { Box, Flex } from '@chakra-ui/react';

interface ProgressBarProps {
  currentPage: number;
  totalPages: number;
}

const ProgressBar = ({ currentPage, totalPages }: ProgressBarProps) => {
  const filledArr = Array.from({ length: currentPage }, (_, i) => i);
  const emptyArr = Array.from(
    { length: totalPages - currentPage },
    (_, i) => i + currentPage
  );

  return (
    <Flex maxW="100%" justify="space-between" gap="5px" p="20px 5% 0 5%">
      {filledArr.map((item) => (
        <Box key={item} w="100%" h="4px" bg="polzzak.default" />
      ))}
      {emptyArr.map((item) => (
        <Box key={item} w="100%" h="4px" bg="rgba(227, 242, 255, 1)" />
      ))}
    </Flex>
  );
};

export default ProgressBar;
