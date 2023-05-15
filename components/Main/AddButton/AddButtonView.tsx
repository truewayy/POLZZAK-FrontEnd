import { Circle } from '@chakra-ui/react';

import { PlusIcon } from '@/public/icon';

interface AddButtonVAProps {
  handleClickButton: () => void;
}

const AddButtonView = ({ handleClickButton }: AddButtonVAProps) => (
  <Circle
    pos="fixed"
    right="16px"
    bottom="80px"
    bg="polzzak.default"
    size={50}
    zIndex={100}
    onClick={handleClickButton}
  >
    <PlusIcon w={5} h={5} />
  </Circle>
);

export default AddButtonView;
