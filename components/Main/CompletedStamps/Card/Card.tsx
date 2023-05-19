import { Box, Flex, Text, VStack } from '@chakra-ui/react';

import { CouponCompleteIcon } from '@/public/icon';

interface CardProps {
  name: string;
  reward: string;
}

const Card = ({ name, reward }: CardProps) => (
  <VStack
    w="100%"
    minH="180px"
    p="24px 20px"
    border="1px solid #E6E4E2"
    align="flex-start"
    borderRadius="8px"
    pos="relative"
  >
    <Box
      pos="absolute"
      top="0px"
      left="0px"
      w="100%"
      h="100%"
      bg="#000000B2"
      opacity="0.6"
      borderRadius="8px"
    />
    <CouponCompleteIcon
      w={160}
      h={100}
      pos="absolute"
      bottom="20px"
      right="10px"
    />
    <Text layerStyle="title3" color="#3F3D3B80">
      {name}
    </Text>
    <Flex w="100%" align="center" gap="8px">
      <Box
        layerStyle="caption1"
        color="#259BEF80"
        p="4px 6px"
        bg="#C7E5FF99"
        borderRadius="4px"
      >
        보상
      </Box>
      <Text layerStyle="body2" color="#3F3D3B80">
        {reward}
      </Text>
    </Flex>
  </VStack>
);

export default Card;
