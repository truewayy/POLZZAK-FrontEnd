import {
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { userInfo } from '@/apis/user';
import { CheckCircle, InfoIcon } from '@/public/icon';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: user } = useQuery(['userInfo'], userInfo);
  const memberType = user?.data?.memberType;
  const isKid = memberType?.name === 'KID';

  return (
    <Flex w="100%" h="44px" p="0 5%" align="center" justify="flex-end">
      <InfoIcon w="20px" h="20px" cursor="pointer" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent m="16px" p="16px" pt="40px" borderRadius="12px">
          <VStack w="100%" spacing="40px">
            <VStack w="100%" spacing="16px" align="flex-start">
              <Flex w="100%" gap="8px" align="center">
                <CheckCircle w="20px" h="20px" fill="polzzak.default" />
                <Text layerStyle="subtitle16Bd">
                  ‘선물 전’ 쿠폰은 무엇인가요?
                </Text>
              </Flex>
              <Text layerStyle="body14Md" color="gray.600">
                {!isKid && '아이가'} 도장판을 다 모아서{' '}
                {isKid ? '받은' : '발급해준'} 선물 쿠폰에 대해, 보호자
                {isKid ? '가' : '님이'} 아직 실제로 전달하지 않은 쿠폰입니다.
              </Text>
            </VStack>
            <VStack w="100%" spacing="16px" align="flex-start">
              <Flex w="100%" gap="8px" align="center">
                <CheckCircle w="20px" h="20px" fill="polzzak.default" />
                <Text layerStyle="subtitle16Bd">
                  ‘선물 {isKid && '받기'} 완료’ 쿠폰은 무엇인가요?
                </Text>
              </Flex>
              <Text layerStyle="body14Md" color="gray.600" wordBreak="keep-all">
                {!isKid && '아이가'} 도장판을 다 모아서 발급해준 선물 쿠폰에
                대해, 보호자{isKid ? '가' : '님이'} <b>실제로 선물을 전달</b>
                해준 쿠폰입니다.
              </Text>
              <Text layerStyle="body14Md" color="gray.600" wordBreak="keep-all">
                {isKid ? (
                  '받은 쿠폰에 있는 '
                ) : (
                  <>
                    <b>아이가</b> 선물을 받고
                  </>
                )}
                <b>‘선물 받기 완료’ 버튼을 눌러줘야</b> ‘선물 {isKid && '받기'}{' '}
                완료’ 쿠폰으로 구분돼요.{' '}
                {isKid && '선물을 실제로 전달받았다면 버튼을 꼭 눌러주세요!'}
              </Text>
            </VStack>
            <Button
              variant="unstyled"
              w="100%"
              p="14px 0"
              h="auto"
              bg="polzzak.default"
              borderRadius="8px"
              onClick={onClose}
            >
              <Text layerStyle="subtitle16Sbd" color="white">
                이해됐어요
              </Text>
            </Button>
          </VStack>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Header;
