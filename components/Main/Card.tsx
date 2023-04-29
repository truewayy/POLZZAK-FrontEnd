import { Box, Flex, Text, VStack } from '@chakra-ui/react';

import { ArrowIcon, HandIcon } from '@/public/icon';

import ProgressCircle from './ProgressCircle';

interface CardProps {
  title: string;
  currentStamp: number;
  totalStamp: number;
  requestCount: number;
  reward: string;
}

const Card = ({
  title,
  currentStamp,
  totalStamp,
  requestCount,
  reward,
}: CardProps) => (
  <VStack
    w="100%"
    minH="390px"
    p="16px"
    bg="white"
    boxShadow="0px 2px 8px rgba(99, 99, 99, 0.2)"
    border="1px solid #E6E4E2"
    borderRadius="8px"
    pos="relative"
    justify="space-between"
  >
    <VStack w="100%" spacing="0px">
      <Flex w="100%" justifyContent="space-between" align="center">
        <Text layerStyle="head18B" color="#3F3D3B">
          {title}
        </Text>
        <ArrowIcon w={4} h={4} />
      </Flex>
      <Text w="100%" layerStyle="body13M" color="#312F2E" textAlign="left">
        {(currentStamp / totalStamp) * 100}% 완성됐어요!
      </Text>
    </VStack>
    <Box w="100%" pos="absolute" top="20%">
      <Box w="100%" pos="relative">
        <ProgressCircle percentage={(currentStamp / totalStamp) * 100} />
        <VStack
          pos="absolute"
          top="35%"
          left="50%"
          transform="translate(-50%, 0%)"
        >
          <Box>
            <Text as="span" layerStyle="highlight24SB" color="polzzak.default">
              {currentStamp}
            </Text>
            <Text as="span" layerStyle="body14L" color="#312F2E">
              /{totalStamp}
            </Text>
          </Box>
          <HandIcon w={10} h={10} />
          <Text layerStyle="highlight16SB" color="#47B2FF">
            요청 {requestCount}개
          </Text>
        </VStack>
      </Box>
    </Box>
    <Flex w="100%" align="center" gap="8px">
      <Box
        layerStyle="caption10SB"
        color="white"
        p="5px 6px"
        bg="blue.400"
        borderRadius="4px"
      >
        보상
      </Box>
      <Text layerStyle="caption12SB">{reward}</Text>
    </Flex>
  </VStack>
);

export default Card;
