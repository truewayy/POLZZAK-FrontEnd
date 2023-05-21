import { Box, Flex, Text } from '@chakra-ui/react';

import { BasicProfileIcon, ChangeProfileIcon } from '@/public/icon';

interface ChangeProfileVAProps {
  handleClickFilter: () => void;
  currentValue: string;
  balloonMessage: string;
}

const ChangeProfileView = ({
  handleClickFilter,
  currentValue,
  balloonMessage,
}: ChangeProfileVAProps) => (
  <Box w="100%" pos="relative" alignSelf="flex-start">
    <BasicProfileIcon width="60px" height="60px" />
    <Flex align="center" pos="absolute" bottom="0" left="45px" gap="8px">
      <Text
        p="4px 8px"
        bg="gray.800"
        color="white"
        borderRadius="20px"
        layerStyle="caption2"
      >
        {currentValue}
      </Text>
      <ChangeProfileIcon w="16px" h="16px" onClick={handleClickFilter} />
    </Flex>
    <Box pos="absolute" top="-25px" left="70px">
      <Box
        p="10px 14px 12px 17px"
        bg="blue.100"
        border="1px solid"
        borderColor="blue.400"
        borderRadius="35px"
        layerStyle="body3"
      >
        {balloonMessage}
      </Box>
    </Box>
  </Box>
);

export default ChangeProfileView;
