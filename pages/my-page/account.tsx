import { Box, Flex, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import ConfirmModal from '@/components/Link/ConfirmModal';
import { POLZZAK_LOCAL, TOKEN_KEY } from '@/constants/auth';
import ROUTES from '@/constants/routes';
import { LeftNavigation } from '@/public/icon';
import { removeLocalStorage } from '@/utils/storage';

const Account = () => {
  const { back, replace } = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const logout = () => {
    removeLocalStorage(TOKEN_KEY);
    removeLocalStorage(POLZZAK_LOCAL);
    onClose();
    replace(ROUTES.LOGIN);
  };

  return (
    <VStack w="100%" minH="100vh" spacing="0px">
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
        <Text layerStyle="subtitle18Sbd">계정관리</Text>
      </Flex>
      <VStack w="100%" p="10px 16px" spacing="0px">
        <Box
          w="100%"
          p="20px 0"
          layerStyle="body14Md"
          borderBottom="1px solid"
          borderColor="gray.200"
          onClick={onOpen}
        >
          로그아웃
        </Box>
        <Box w="100%" p="20px 0" layerStyle="body14Md">
          회원탈퇴
        </Box>
      </VStack>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        confirmMessage="로그아웃 할래요"
        cancelMessage="취소"
        handleClickCancelButton={onClose}
        handleClickConfirmButton={logout}
      >
        <VStack spacing="8px">
          <Text layerStyle="subtitle18Sbd">정말로 로그아웃 하시겠어요?</Text>
        </VStack>
      </ConfirmModal>
    </VStack>
  );
};

export default Account;
