import { Box, Circle } from '@chakra-ui/react';

import { GoogleIcon, KakaoIcon } from '@/public/icon';

type LoginType = 'kakao' | 'google';

interface LoginButtonVAProps {
  type: LoginType;
  isLastLoginButton: boolean;
  handleClick: () => void;
}

const loginStyle = {
  kakao: {
    bgColor: '#FEE500',
    icon: <KakaoIcon w="22px" h="20px" />,
    border: 'none',
    borderColor: 'none',
  },
  google: {
    bgColor: '#FFFFFF',
    icon: <GoogleIcon w="22px" h="20px" />,
    border: '1px solid',
    borderColor: 'gray.200',
  },
};

const LoginButtonView = ({
  type,
  isLastLoginButton,
  handleClick,
}: LoginButtonVAProps) => (
  <Circle
    pos="relative"
    size="60px"
    bg={loginStyle[type].bgColor}
    onClick={handleClick}
    border={loginStyle[type].border}
    borderColor={loginStyle[type].borderColor}
    cursor="pointer"
  >
    {loginStyle[type].icon}
    {isLastLoginButton && (
      <Box pos="absolute" bottom="-60px">
        <Box
          pos="relative"
          layerStyle="caption12Md"
          textAlign="center"
          w="120px"
          p="5px 10px"
          bg="white"
          borderRadius="8px"
          boxShadow="0px 1px 10px 1px rgba(0, -4, 16, 0.1)"
          color="gray.600"
        >
          마지막으로
          <br /> 로그인한 계정이에요
          <Box
            pos="absolute"
            top="-5px"
            left="50%"
            w="10px"
            h="10px"
            bgColor="white"
            transform="translateX(-50%) rotate(45deg)"
          />
        </Box>
      </Box>
    )}
  </Circle>
);

export default LoginButtonView;
