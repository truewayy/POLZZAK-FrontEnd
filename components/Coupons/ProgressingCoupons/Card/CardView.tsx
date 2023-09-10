/* eslint-disable no-nested-ternary */
import { Box, Button, Circle, Flex, Text, VStack } from '@chakra-ui/react';

import ConfirmModal from '@/components/Link/ConfirmModal';
import { Barcodes } from '@/public/icon';

interface CardVAProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  reward: string;
  rewardDate: string;
  dateDiff: string;
  isKid: boolean;
  handleClickCard: () => void;
  handleClickReceiveButton: () => void;
  handleClickConfirmButton: () => void;
}

const CardView = ({
  isOpen,
  isLoading,
  onClose,
  reward,
  rewardDate,
  dateDiff,
  isKid,
  handleClickCard,
  handleClickReceiveButton,
  handleClickConfirmButton,
}: CardVAProps) => (
  <Flex w="100%" minH="180px" onClick={handleClickCard}>
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
          ⏰&nbsp;&nbsp;D{dateDiff}
        </Box>
        <Text layerStyle="subtitle16Sbd" color="#000">
          {reward}
        </Text>
      </VStack>
      {!isKid && (
        <Text color="gray.700" layerStyle="caption12Md">
          <Text as="span" color="polzzak.default">
            {rewardDate}
          </Text>
          까지 주기로 약속했어요
        </Text>
      )}
      {isKid && (
        <Flex w="100%" pr="4px" gap="6px">
          <Button
            variant="unstyled"
            w="100%"
            h="auto"
            p="8.5px"
            borderRadius="5px"
            color="white"
            bg="polzzak.default"
            layerStyle="caption12Md"
          >
            선물 조르기
          </Button>
          <Button
            variant="unstyled"
            w="100%"
            h="auto"
            p="8.5px"
            color="blue.600"
            borderRadius="5px"
            border="1px solid"
            borderColor="blue.150"
            bg="white"
            layerStyle="caption12Md"
            onClick={(e) => {
              e.stopPropagation();
              handleClickReceiveButton();
            }}
          >
            선물 받기 완료
          </Button>
        </Flex>
      )}
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
    <ConfirmModal
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      handleClickConfirmButton={handleClickConfirmButton}
      handleClickCancelButton={onClose}
    >
      <VStack spacing="8px">
        <Text layerStyle="subtitle18Sbd" color="blue.600">
          {reward}
        </Text>
        <Text layerStyle="body16Md" color="gray.800">
          선물을 실제로 전달받았나요?
        </Text>
      </VStack>
    </ConfirmModal>
  </Flex>
);

export default CardView;
