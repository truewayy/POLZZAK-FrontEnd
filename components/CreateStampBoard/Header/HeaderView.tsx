import { Box, Flex, Text } from '@chakra-ui/react';
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form';

import ConfirmModal from '@/components/Link/ConfirmModal';
import { BackIcon } from '@/public/icon';

interface HeaderVAProps {
  confirm: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
  };
  isLoading: boolean;
  handleClickBack: () => void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  handleClickRegister: (data: Object) => void;
  handleClickConfirmApproveButton: () => void;
}

const HeaderView = ({
  confirm,
  isLoading,
  handleClickBack,
  handleSubmit,
  handleClickRegister,
  handleClickConfirmApproveButton,
}: HeaderVAProps) => (
  <Box w="100%" pos="fixed" top={0} left={0} p="0 5%" bg="white" zIndex={3}>
    <Flex
      maxW="560px"
      w="100%"
      margin="0 auto"
      h="44px"
      justify="space-between"
      alignItems="center"
      pos="relative"
    >
      <BackIcon w={4} h={5} onClick={handleClickBack} />
      <Text
        layerStyle="subtitle18Sbd"
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        도장판 생성
      </Text>
      <Text
        layerStyle="subtitle16Sbd"
        color="polzzak.default"
        cursor="pointer"
        onClick={handleSubmit(handleClickRegister)}
      >
        등록
      </Text>
    </Flex>
    <ConfirmModal
      isOpen={confirm.isOpen}
      onClose={confirm.onClose}
      handleClickCancelButton={confirm.onClose}
      handleClickConfirmButton={handleSubmit(handleClickConfirmApproveButton)}
      isLoading={isLoading}
      confirmMessage="네, 등록할게요"
    >
      <Text layerStyle="subtitle18Sbd" textAlign="center">
        도장판을 등록하시겠어요?
      </Text>
    </ConfirmModal>
  </Box>
);

export default HeaderView;
