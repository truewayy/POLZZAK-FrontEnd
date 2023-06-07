import { Flex } from '@chakra-ui/react';

import { LeftArrow } from '@/public/icon';

interface HeaderViewProps {
  goBack: () => void;
}

const HeaderView = ({ goBack }: HeaderViewProps) => (
  <Flex
    w="100%"
    h="50px"
    mb="36px"
    justifyContent="space-between"
    alignItems="center"
  >
    <LeftArrow w={11} h={19} onClick={goBack} />
  </Flex>
);

export default HeaderView;
