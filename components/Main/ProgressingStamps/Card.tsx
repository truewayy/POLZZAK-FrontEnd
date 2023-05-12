import { Box, Flex, Text, VStack } from '@chakra-ui/react';

import { ArrowIcon, CompleteIcon, HandIcon } from '@/public/icon';

import ProgressCircle from './ProgressCircle/ProgressCircle';

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
    minH="400px"
    p="20px"
    bg="white"
    boxShadow="0px 2px 8px rgba(99, 99, 99, 0.2)"
    border="1px solid #E6E4E2"
    borderRadius="8px"
    pos="relative"
    justify="space-between"
  >
    <VStack w="100%" spacing="0px">
      <Flex w="100%" justifyContent="space-between" align="center">
        <Text layerStyle="head20B" color="#3F3D3B">
          {title}
        </Text>
        <ArrowIcon w={4} h={4} />
      </Flex>
    </VStack>
    <Box w="100%" pos="absolute" top="12%">
      <Box w="100%" pos="relative">
        <ProgressCircle percentage={(currentStamp / totalStamp) * 100} />
        <VStack
          pos="absolute"
          top="25%"
          left="50%"
          transform="translate(-50%, 0%)"
        >
          <Box>
            <Text as="span" layerStyle="highlight24SB" color="polzzak.default">
              {currentStamp}
            </Text>
            <Text as="span" layerStyle="body16M" color="gray.400">
              /{totalStamp}
            </Text>
          </Box>
          {currentStamp === totalStamp && (
            <Box
              bg="#FE6E6E"
              borderRadius="10px"
              p="4px 12px"
              color="white"
              layerStyle="highlight14SB"
              pos="relative"
            >
              쿠폰을 발급해주세요!
              <Box
                w={0}
                h={0}
                pos="absolute"
                bottom="-15px"
                left="50%"
                transform="translate(-50%, 0%)"
                borderLeft="10px solid transparent"
                borderRight="10px solid transparent"
                borderTop="10px solid #FE6E6E"
                borderBottom="10px solid transparent"
              />
            </Box>
          )}
          {currentStamp !== totalStamp ? (
            <HandIcon w={76} h={67} />
          ) : (
            <CompleteIcon w={76} h={67} />
          )}
          {currentStamp !== totalStamp && (
            <Box
              layerStyle="body14R"
              color="#47B2FF"
              bg="blue.100"
              p="2px 12px"
              borderRadius="10px"
            >
              도장 요청{' '}
              <Text as="span" layerStyle="highlight14SB">
                {requestCount}
              </Text>
              개
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
    <Flex w="100%" align="center" gap="8px">
      <Box
        layerStyle="caption10SB"
        color="white"
        p="4px 6px"
        bg="blue.400"
        borderRadius="4px"
      >
        보상
      </Box>
      <Text layerStyle="highlight14SB">{reward}</Text>
    </Flex>
  </VStack>
);

export default Card;
