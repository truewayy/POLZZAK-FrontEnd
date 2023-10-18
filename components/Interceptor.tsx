/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/prefer-default-export */
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
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { http } from '@/apis/http';
import { POLZZAK_LOCAL, TOKEN_KEY } from '@/constants/auth';
import ROUTES from '@/constants/routes';
import { removeLocalStorage } from '@/utils/storage';

interface UseInterceptorProps {
  children: React.ReactNode;
}
export const Interceptor = ({ children }: UseInterceptorProps) => {
  const { replace } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const responseHandler = http.interceptors.response.use(
      (response) => response,
      (error) => {
        const tokenInvalidErr = error.response.data.code === 431;
        const tokenExpiredErr = error.response.status === 401;
        if (tokenInvalidErr) {
          removeLocalStorage(TOKEN_KEY);
          removeLocalStorage(POLZZAK_LOCAL);
          replace(ROUTES.LOGIN);
        }
        if (tokenExpiredErr) {
          removeLocalStorage(TOKEN_KEY);
          removeLocalStorage(POLZZAK_LOCAL);
          if (!isOpen) onOpen();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      http.interceptors.response.eject(responseHandler);
    };
  }, [isOpen, onOpen, replace]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent w="90%" borderRadius="12px" bg="white">
          <VStack w="100%" h="100%" p="40px 16px 16px 16px" spacing="40px">
            <Text layerStyle="subtitle18Sbd" textAlign="center">
              로그아웃 되었어요. <br />
              다시 로그인 해주세요!
            </Text>
            <Flex w="100%">
              <Button
                w="100%"
                h="auto"
                p="12px 24px"
                borderRadius="8px"
                bg="polzzak.default"
                layerStyle="subtitle16Sbd"
                color="white"
                onClick={() => {
                  onClose();
                  replace(ROUTES.LOGIN);
                }}
              >
                확인
              </Button>
            </Flex>
          </VStack>
        </ModalContent>
      </Modal>

      {children}
    </>
  );
};
