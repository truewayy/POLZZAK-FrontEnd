import { Circle, Flex } from '@chakra-ui/react';

import { PlusIcon } from '@/public/icon';

interface AddButtonVAProps {
  handleClickButton: () => void;
}

const AddButtonView = ({ handleClickButton }: AddButtonVAProps) => (
  <Flex w="100%" maxW="560px" pos="fixed" bottom="90px" zIndex={100}>
    <Circle
      bg="polzzak.default"
      size={50}
      zIndex={100}
      onClick={handleClickButton}
      cursor="pointer"
      marginLeft="auto"
      marginRight="5%"
    >
      <PlusIcon w={5} h={5} />
    </Circle>
  </Flex>
);

export default AddButtonView;
