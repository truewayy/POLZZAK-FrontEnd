import { Button } from '@chakra-ui/react';

interface ButtonProps {
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
  children: React.ReactNode;
}

const NextStepButton = ({ onClick = () => {}, children }: ButtonProps) => (
  <Button
    bg="polzzak.default"
    w="90%"
    p="22px"
    borderRadius={10}
    layerStyle="highlight16SB"
    color="white"
    pos="absolute"
    bottom="30px"
    _hover={{ bg: 'polzzak.default' }}
    onClick={onClick}
  >
    {children}
  </Button>
);

export default NextStepButton;
