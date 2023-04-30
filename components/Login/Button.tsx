import { Button } from '@chakra-ui/react';

import ROUTES from '@/constants/routes';
import { GoogleIcon, KakaoIcon } from '@/public/icon';

export interface LoginButtonProps {
  type: 'kakao' | 'google';
}

const login = {
  kakao: {
    msg: '카카오로 시작하기',
    color: '#000000',
    bgColor: '#FFC736',
    bg: <KakaoIcon w={21} h={21} pos="absolute" left="26px" />,
    handleClick: () => {
      window.location.href = ROUTES.KAKAO_LOGIN;
    },
  },
  google: {
    msg: '구글로 시작하기',
    color: '#000000',
    bgColor: '#DADAE7',
    bg: <GoogleIcon w={21} h={21} pos="absolute" left="26px" />,
    handleClick: () => {
      window.location.href = ROUTES.GOOGLE_LOGIN;
    },
  },
};

const LoginButton = ({ type }: LoginButtonProps) => (
  <Button
    variant="outline"
    pos="relative"
    w="100%"
    p="24px"
    borderRadius="8px"
    fontSize="16px"
    fontWeight="400"
    color={login[type].color}
    bgColor={login[type].bgColor}
    onClick={login[type].handleClick}
    _hover={{ bgColor: login[type].bgColor }}
  >
    {login[type].msg}
    {login[type].bg}
  </Button>
);

export default LoginButton;
