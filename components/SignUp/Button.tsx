/* eslint-disable react/require-default-props */
import { Button, ButtonProps } from '@chakra-ui/react';

interface NextStepButtonProps extends ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const NextStepButton = ({
  onClick = () => {},
  children,
  disabled,
  ...props
}: NextStepButtonProps) => (
  <Button
    bg="polzzak.default"
    w="90%"
    p="22px"
    borderRadius={10}
    layerStyle="subtitle16Sbd"
    color="white"
    pos="absolute"
    bottom="30px"
    left="5%"
    _hover={{ bg: 'polzzak.default' }}
    onClick={onClick}
    isDisabled={disabled}
    _disabled={{ bg: 'gray.300', cursor: 'not-allowed' }}
    cursor="pointer"
    {...props}
  >
    {children}
  </Button>
);

export default NextStepButton;
