import { Flex, Text } from '@chakra-ui/react';

import { BackIcon } from '@/public/icon';

interface HeaderVAProps {
  handleClickBack: () => void;
  handleClickRegister: () => void;
}

const HeaderView = ({
  handleClickBack,
  handleClickRegister,
}: HeaderVAProps) => (
  <Flex
    w="100%"
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
      onClick={handleClickRegister}
    >
      등록
    </Text>
  </Flex>
);

export default HeaderView;
