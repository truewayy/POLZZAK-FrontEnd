import { Box, Flex, Text } from '@chakra-ui/react';
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form';

import { BackIcon } from '@/public/icon';

interface HeaderVAProps {
  handleClickBack: () => void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  handleClickRegister: (data: Object) => void;
}

const HeaderView = ({
  handleClickBack,
  handleSubmit,
  handleClickRegister,
}: HeaderVAProps) => (
  <Box w="100%" pos="fixed" top={0} left={0} p="0 5%" bg="white" zIndex={99}>
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
        layerStyle="subtitle1"
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        도장판 생성
      </Text>
      <Text
        layerStyle="subtitle3"
        color="polzzak.default"
        onClick={handleSubmit(handleClickRegister)}
      >
        등록
      </Text>
    </Flex>
  </Box>
);

export default HeaderView;
