import { Box, Flex, Text } from '@chakra-ui/react';

interface HeaderProps {
  stampboardName: string;
  isCompleted: boolean;
  completingDate: number;
  progressingDate: number;
}

const Header = ({
  stampboardName,
  isCompleted,
  completingDate,
  progressingDate,
}: HeaderProps) => (
  <Flex w="100%" pb="10px" justify="space-between" align="flex-start">
    <Text w="80%" layerStyle="title24Sbd" color="rgba(46, 48, 56, 1)">
      {stampboardName}
    </Text>
    <Box
      bg="#59B9FF"
      borderRadius="6px"
      color="white"
      p="4px 8px"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
      layerStyle="subtitle16Sbd"
    >
      {isCompleted ? `${completingDate}일 걸렸어요!` : `D+${progressingDate}`}
    </Box>
  </Flex>
);

export default Header;
