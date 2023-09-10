import {
  Button,
  Flex,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import ConfirmModal from '@/components/Link/ConfirmModal';
import { CheckCircle, ExitIcon, LeftNavigation } from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';

const Exit = () => {
  const { nickname } = useRecoilValue(userInfoAtom);
  const [userNickname, setUserNickname] = useState(''); // [TODO
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { back } = useRouter();

  const [agreeList, setAgreeList] = useState([false, false, false, false]);

  const handleClickAgree = (index: number) => {
    const newArr = [...agreeList];
    newArr[index] = !newArr[index];
    setAgreeList(newArr);
  };

  useEffect(() => {
    setUserNickname(nickname);
  }, [nickname]);

  return (
    <VStack w="100%" minH="100vh" spacing="0px" pos="relative">
      <Flex
        pos="sticky"
        top="0"
        w="100%"
        h="45px"
        p="10px 16px"
        justify="center"
        align="center"
        bg="white"
      >
        <LeftNavigation
          w="24px"
          h="24px"
          fill="gray.700"
          pos="absolute"
          left="16px"
          onClick={back}
        />
        <Text layerStyle="subtitle18Sbd">회원탈퇴</Text>
      </Flex>
      <VStack w="100%" p="0 16px" spacing="30px" pt="40px">
        <Text w="100%" layerStyle="title22Sbd">
          {userNickname} 회원님
          <br />
          폴짝을 떠나시나요?
        </Text>
        <VStack
          w="100%"
          h="200px"
          bg="gray.100"
          borderRadius="12px"
          justify="center"
        >
          <ExitIcon w="113px" h="130px" />
        </VStack>
        <VStack w="100%" spacing="20px">
          <Text w="100%" layerStyle="subtitle16Sbd">
            다음 안내사항을 확인하고 동의해주세요
          </Text>
          <VStack w="100%" spacing="12px">
            <Flex
              w="100%"
              gap="8px"
              align="center"
              cursor="pointer"
              onClick={() => handleClickAgree(0)}
            >
              <Icon
                as={CheckCircle}
                fill={agreeList[0] ? '#59B9FF' : '#DADAE7'}
                w="20px"
                h="20px"
              />
              <Text layerStyle="body14Md" color="gray.500">
                가입한 소셜 계정 정보가 삭제돼요.
              </Text>
            </Flex>
            <Flex
              w="100%"
              gap="8px"
              align="center"
              cursor="pointer"
              onClick={() => handleClickAgree(1)}
            >
              <Icon
                as={CheckCircle}
                fill={agreeList[1] ? '#59B9FF' : '#DADAE7'}
                w="20px"
                h="20px"
              />
              <Text layerStyle="body14Md" color="gray.500">
                연동 목록이 모두 삭제돼요.
              </Text>
            </Flex>
            <Flex
              w="100%"
              gap="8px"
              align="center"
              cursor="pointer"
              onClick={() => handleClickAgree(2)}
            >
              <Icon
                as={CheckCircle}
                fill={agreeList[2] ? '#59B9FF' : '#DADAE7'}
                w="20px"
                h="20px"
              />
              <Text layerStyle="body14Md" color="gray.500">
                도장판과 쿠폰들이 모두 사라져요.
              </Text>
            </Flex>
            <Flex
              w="100%"
              gap="8px"
              align="center"
              cursor="pointer"
              onClick={() => handleClickAgree(3)}
            >
              <Icon
                as={CheckCircle}
                fill={agreeList[3] ? '#59B9FF' : '#DADAE7'}
                w="20px"
                h="20px"
              />
              <Text layerStyle="body14Md" color="gray.500">
                열심히 모은 포인트가 모두 사라져요.
              </Text>
            </Flex>
          </VStack>
        </VStack>
      </VStack>
      <Button
        bg="polzzak.default"
        w="calc(100% - 32px)"
        p="22px"
        borderRadius={10}
        layerStyle="subtitle16Sbd"
        color="white"
        pos="absolute"
        bottom="30px"
        _hover={{ bg: 'polzzak.default' }}
        _disabled={{ bg: 'gray.300', cursor: 'not-allowed' }}
        cursor="pointer"
        isDisabled={agreeList.includes(false)}
        onClick={onOpen}
      >
        탈퇴하기
      </Button>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        confirmMessage="네, 탈퇴할래요"
        cancelMessage="아니요"
        handleClickCancelButton={onClose}
        handleClickConfirmButton={onClose}
      >
        <VStack spacing="8px">
          <Text layerStyle="subtitle18Sbd">정말로 탈퇴하시겠어요?</Text>
        </VStack>
      </ConfirmModal>
    </VStack>
  );
};

export default Exit;
