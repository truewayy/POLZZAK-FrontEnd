import {
  Box,
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';

interface CouponIssuedModalProps {
  isKid: boolean;
  stampType: string;
  guardianType: string;
  isOpen: boolean;
  onClose: () => void;
}

const StampCompleteModal = ({
  isKid,
  stampType,
  guardianType,
  isOpen,
  onClose,
}: CouponIssuedModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent w="90%" h="460px" borderRadius="12px" bg="white">
      <VStack w="100%" h="100%" p="48px 5% 16px 5%" spacing="35px">
        <Text layerStyle="subtitle18Sbd" color="blue.600" textAlign="center">
          {isKid ? `${guardianType}에게` : stampType}
          <Text layerStyle="subtitle16Sbd" color="gray.800">
            {isKid ? '도장을 요청했어요!' : '도장이 찍혔어요!'}
          </Text>
        </Text>
        <Box w="200px" h="200px" bg="gray.100" />
        <Flex w="100%" pt="30px">
          <Button
            w="100%"
            h="auto"
            p="12px 24px"
            borderRadius="8px"
            bg="polzzak.default"
            layerStyle="subtitle16Sbd"
            color="white"
            onClick={onClose}
          >
            닫기
          </Button>
        </Flex>
      </VStack>
    </ModalContent>
  </Modal>
);

export default StampCompleteModal;
