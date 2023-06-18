import { Button } from '@chakra-ui/react';

interface ButtonProps {
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
  children: React.ReactNode;
  disabled: boolean;
}

const NextStepButton = ({
  onClick = () => {},
  children,
  disabled,
}: ButtonProps) => (
  <Button
    bg="polzzak.default"
    w="90%"
    p="22px"
    borderRadius={10}
    layerStyle="subtitle3"
    color="white"
    pos="absolute"
    bottom="30px"
    left="5%"
    _hover={{ bg: 'polzzak.default' }}
    onClick={onClick}
    isDisabled={disabled}
    cursor="pointer"
  >
    {children}
  </Button>
);

export default NextStepButton;
