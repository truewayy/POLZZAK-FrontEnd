/* eslint-disable no-nested-ternary */
import { Box, Flex, Text, VStack } from '@chakra-ui/react';

import { ArrowIcon } from '@/public/icon';

import ProgressCircle from './ProgressCircle/ProgressCircle';

interface CardVAProps {
  name: string;
  currentStampCount: number;
  goalStampCount: number;
  percentage: number;
  isStampBoardComplete: boolean;
  completeMessage: string;
  messageColor: string;
  statusIcon: React.ReactNode;
  isRequest: boolean;
  missionRequestCount: number;
  reward: string;
  handleClickCard: () => void;
}

const CardView = ({
  name,
  currentStampCount,
  goalStampCount,
  percentage,
  isStampBoardComplete,
  completeMessage,
  messageColor,
  statusIcon,
  isRequest,
  missionRequestCount,
  reward,
  handleClickCard,
}: CardVAProps) => (
  <VStack
    w="100%"
    minH="377px"
    p="20px"
    bg="white"
    border="1px solid"
    borderColor="gray.300"
    borderRadius="8px"
    pos="relative"
    justify="space-between"
    onClick={handleClickCard}
  >
    <VStack w="100%" spacing="0px">
      <Flex w="100%" justifyContent="space-between" gap="16px" align="center">
        <Text
          layerStyle="title20Bd"
          color="#3F3D3B"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {name}
        </Text>
        <ArrowIcon w={4} h={4} />
      </Flex>
    </VStack>
    <Box w="100%" pos="absolute" top="14%">
      <Box w="100%" pos="relative">
        <ProgressCircle percentage={percentage} />
        <VStack
          pos="absolute"
          top="27%"
          left="50%"
          transform="translate(-50%, 0%)"
        >
          <Box mb="10px">
            <Text as="span" layerStyle="title24Sbd" color="polzzak.default">
              {currentStampCount}
            </Text>
            <Text as="span" layerStyle="subtitle16Md" color="gray.400">
              /{goalStampCount}
            </Text>
          </Box>
          {isStampBoardComplete && (
            <Box
              bg={messageColor}
              borderRadius="10px"
              p="4px 12px"
              color="white"
              layerStyle="body14Sbd"
              pos="relative"
            >
              {completeMessage}
              <Box
                w="10px"
                h="10px"
                pos="absolute"
                bottom="-4px"
                left="50%"
                transform="translate(-50%, 0%) rotate(45deg)"
                zIndex="-1"
                bg={messageColor}
              />
            </Box>
          )}
          {statusIcon}
          {!isStampBoardComplete && (
            <Box
              layerStyle="caption12Sbd"
              color={isRequest ? 'polzzak.highlighted' : 'polzzak.default'}
              bg="blue.100"
              p="3px 12px"
              borderRadius="10px"
              opacity={isRequest ? 1 : 0.5}
            >
              도장 요청{' '}
              <Text as="span" fontWeight="700">
                {missionRequestCount}
              </Text>
              개
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
    <Flex w="100%" align="center" gap="8px">
      <Box
        layerStyle="caption12Sbd"
        color="white"
        p="4px 6px"
        bg="blue.400"
        borderRadius="4px"
      >
        보상
      </Box>
      <Text layerStyle="body14Sbd">{reward}</Text>
    </Flex>
  </VStack>
);

export default CardView;
