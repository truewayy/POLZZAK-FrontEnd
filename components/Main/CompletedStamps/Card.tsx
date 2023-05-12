import { Box, Flex, Text, VStack } from '@chakra-ui/react';

import { CouponCompleteIcon } from '@/public/icon';

interface CardProps {
  title: string;
  reward: string;
}

const Card = ({ title, reward }: CardProps) => (
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
      w={150}
      h={95}
      pos="absolute"
      bottom="20px"
      right="18px"
    />
    <Text layerStyle="head20B" color="#3F3D3B80">
      {title}
    </Text>
    <Flex w="100%" align="center" gap="8px">
      <Box
        layerStyle="caption10SB"
        color="#259BEF80"
        p="4px 6px"
        bg="#C7E5FF99"
        borderRadius="4px"
      >
        보상
      </Box>
      <Text layerStyle="highlight14SB" color="#3F3D3B80">
        {reward}
      </Text>
    </Flex>
  </VStack>
);

export default Card;
