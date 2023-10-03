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
import { useQuery } from 'react-query';

import { userInfo } from '@/apis/user';

interface CouponIssuedModalProps {
  reward: string;
  isOpen: boolean;
  onClose: () => void;
}

const CouponIssuedModal = ({
  reward,
  isOpen,
  onClose,
}: CouponIssuedModalProps) => {
  const { data: user } = useQuery(['userInfo'], userInfo);
  const name = user?.data?.memberType.name;

  const isKid = name === 'KID';

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent w="90%" h="460px" borderRadius="12px" bg="white">
        <VStack w="100%" h="100%" p="48px 5% 16px 5%" spacing="35px">
          <Text layerStyle="subtitle18Sbd" color="blue.600" textAlign="center">
            {reward}
            <Text layerStyle="subtitle16Sbd" color="gray.800">
              {isKid ? '쿠폰 받기 완료!' : '쿠폰 발급 완료!'}
            </Text>
          </Text>
          <Box
            w="200px"
            h="200px"
            bgImg="/createCoupon.png"
            bgSize="contain"
            bgRepeat="no-repeat"
            bgPosition="center"
          />
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
};

export default CouponIssuedModal;
