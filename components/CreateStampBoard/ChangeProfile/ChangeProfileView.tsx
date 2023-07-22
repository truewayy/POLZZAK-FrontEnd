import { Box, Circle, Flex, Text } from '@chakra-ui/react';

import { BalloonMsg, ChangeProfileIcon } from '@/public/icon';

interface ChangeProfileVAProps {
  handleClickFilter: () => void;
  currentValue: string;
  profileUrl: string | undefined;
}

const ChangeProfileView = ({
  handleClickFilter,
  currentValue,
  profileUrl,
}: ChangeProfileVAProps) => (
  <Box w="100%" pos="relative" alignSelf="flex-start">
    <Circle
      size="60px"
      bgImg={profileUrl}
      bgColor={profileUrl ? 'none' : 'gray.200'}
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
    />
    <Flex align="center" pos="absolute" bottom="0" left="45px" gap="8px">
      <Text
        p="4px 8px"
        bg="gray.800"
        color="white"
        borderRadius="20px"
        layerStyle="caption12Md"
      >
        {currentValue}
      </Text>
      <ChangeProfileIcon w="16px" h="16px" onClick={handleClickFilter} />
    </Flex>
    <Box pos="absolute" top="-25px" left="70px">
      <BalloonMsg w="181px" h="42px" />
    </Box>
  </Box>
);

export default ChangeProfileView;
