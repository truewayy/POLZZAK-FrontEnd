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
  mission: string;
  missionCompleteTime: string;
  stampType: { id: number; content: string; icon: string } | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const StampModal = ({
  mission,
  missionCompleteTime,
  stampType,
  isOpen,
  onClose,
}: CouponIssuedModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent w="90%" h="460px" borderRadius="12px" bg="white">
      <VStack w="100%" h="100%" p="48px 5% 16px 5%" spacing="30px">
        <Text layerStyle="subtitle20Sbd" textAlign="center">
          미션 완료
        </Text>
        <Box
          w="200px"
          h="200px"
          bgImg={stampType?.icon}
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPosition="center"
        />
        <VStack w="100%" pt="10px" spacing="6px">
          <Text layerStyle="body18Md">{mission}</Text>
          <Text layerStyle="subtitle16Md" color="gray.500">
            {missionCompleteTime}
          </Text>
        </VStack>
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

export default StampModal;
