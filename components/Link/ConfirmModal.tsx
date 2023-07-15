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
  confirmMessage?: string;
  cancelMessage?: string;
  isLoading?: boolean;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  handleClickCancelButton,
  handleClickConfirmButton,
  confirmMessage = '네, 좋아요!',
  cancelMessage = '아니요',
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
                <Text
                  layerStyle="subtitle16Sbd"
                  color="white"
                  textAlign="center"
                >
                  {cancelMessage}
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
                <Text
                  layerStyle="subtitle16Sbd"
                  color="white"
                  textAlign="center"
                >
                  {confirmMessage}
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
