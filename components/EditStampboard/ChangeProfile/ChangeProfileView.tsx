import { Box, Circle, Flex, Text } from '@chakra-ui/react';

import { BalloonMsg } from '@/public/icon';

interface ChangeProfileVAProps {
  currentValue: string;
  profileUrl: string | undefined;
}

const ChangeProfileView = ({
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
    </Flex>
    <Box pos="absolute" top="-25px" left="70px">
      <BalloonMsg w="181px" h="42px" />
    </Box>
  </Box>
);

export default ChangeProfileView;
