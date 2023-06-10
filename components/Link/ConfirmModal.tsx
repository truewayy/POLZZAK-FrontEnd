/* eslint-disable react/require-default-props */
import {
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  handleClickCancelButton: () => void;
  handleClickConfirmButton: () => void;
  isLoading?: boolean;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  handleClickCancelButton,
  handleClickConfirmButton,
  isLoading = false,
  children,
}: ConfirmModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent w="90%" p="40px 16px 16px 16px" borderRadius="12px">
      <VStack spacing="40px" justify="center" w="100%">
        {children}
        <Flex
          w="100%"
          justify={isLoading ? 'center' : 'space-between'}
          gap="11px"
        >
          {isLoading ? (
            <Spinner color="polzzak.default" size="md" />
          ) : (
            <>
              <Button
                variant="unstyled"
                bgColor="gray.300"
                h="50px"
                w="50%"
                borderRadius="8px"
                onClick={handleClickCancelButton}
              >
                <Text layerStyle="subtitle3" color="white" textAlign="center">
                  아니요
                </Text>
              </Button>
              <Button
                variant="unstyled"
                bgColor="polzzak.default"
                h="50px"
                w="50%"
                borderRadius="8px"
                onClick={handleClickConfirmButton}
              >
                <Text layerStyle="subtitle3" color="white" textAlign="center">
                  네, 좋아요!
                </Text>
              </Button>
            </>
          )}
        </Flex>
      </VStack>
    </ModalContent>
  </Modal>
);

export default ConfirmModal;
