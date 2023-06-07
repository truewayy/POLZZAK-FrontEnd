import { Button } from '@chakra-ui/react';

import { GoogleIcon, KakaoIcon } from '@/public/icon';

type LoginType = 'kakao' | 'google';

interface LoginButtonVAProps {
  type: LoginType;
  handleClick: () => void;
}

const loginStyle = {
  kakao: {
    msg: '카카오로 시작하기',
    color: '#000000',
    bgColor: '#FFC736',
    bg: <KakaoIcon w={21} h={21} pos="absolute" left="26px" />,
  },
  google: {
    msg: '구글로 시작하기',
    color: '#000000',
    bgColor: '#DADAE7',
    bg: <GoogleIcon w={21} h={21} pos="absolute" left="26px" />,
  },
};

const LoginButtonView = ({ type, handleClick }: LoginButtonVAProps) => (
  <Button
    variant="outline"
    pos="relative"
    w="100%"
    p="24px"
    borderRadius="8px"
    fontSize="16px"
    fontWeight="400"
    color={loginStyle[type].color}
    bgColor={loginStyle[type].bgColor}
    onClick={handleClick}
    _hover={{ bgColor: loginStyle[type].bgColor }}
  >
    {loginStyle[type].msg}
    {loginStyle[type].bg}
  </Button>
);

export default LoginButtonView;
