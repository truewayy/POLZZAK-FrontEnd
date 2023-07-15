/* eslint-disable no-nested-ternary */
import { Box, Circle, Flex, Text, VStack } from '@chakra-ui/react';

import { Barcodes } from '@/public/icon';

interface CardVAProps {
  // name: string;
  // currentStampCount: number;
  // goalStampCount: number;
  // percentage: number;
  // isStampBoardComplete: boolean;
  // completeMessage: string;
  // messageColor: string;
  // statusIcon: React.ReactNode;
  // isRequest: boolean;
  // missionRequestCount: number;
  reward: string;
  // handleClickCard: () => void;
}

const CardView = ({
  // name,
  // currentStampCount,
  // goalStampCount,
  // percentage,
  // isStampBoardComplete,
  // completeMessage,
  // messageColor,
  // statusIcon,
  // isRequest,
  // missionRequestCount,
  reward,
}: // handleClickCard,
CardVAProps) => (
  <Flex w="100%" minH="180px">
    <VStack
      w="70%"
      p="16px 16px 24px 16px"
      align="flex-start"
      justify="space-between"
      bg="white"
      borderRadius="8px 0 0 8px"
    >
      <VStack spacing="8px" align="flex-start">
        <Box
          p="4px 8px"
          bg="blue.150"
          color="polzzak.default"
          layerStyle="caption12Bd"
          borderRadius="4px"
        >
          ⏰&nbsp;&nbsp;D-99
        </Box>
        <Text layerStyle="subtitle16Sbd" color="#000">
          {reward}
        </Text>
      </VStack>
      <Text color="gray.700" layerStyle="caption12Md">
        <Text as="span" color="polzzak.default">
          2023.03.27
        </Text>
        까지 주기로 약속했어요
      </Text>
    </VStack>
    <VStack
      w="30%"
      borderRadius="0 8px 8px 0"
      pos="relative"
      bg="blue.400"
      p="15px 27px"
      justify="flex-end"
      spacing="0"
    >
      <Barcodes w="60px" h="50px" />
      <Circle
        size="29px"
        pos="absolute"
        top="50%"
        left="-13px"
        transform="translateY(-50%)"
        bg="blue.400"
      />
    </VStack>
  </Flex>
);

export default CardView;
