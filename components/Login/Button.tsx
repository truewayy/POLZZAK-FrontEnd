import { Button } from '@chakra-ui/react';

interface LoginButtonProps {
  type: 'kakao' | 'naver' | 'apple' | 'google';
}

const login = {
  kakao: {
    msg: '카카오로 시작하기',
    color: '#FFF',
    bgColor: '#FFC736',
  },
  naver: {
    msg: '네이버로 시작하기',
    color: '#FFF',
    bgColor: '#26C035',
  },
  apple: {
    msg: '애플로 시작하기',
    color: '#484644',
    bgColor: '#FFF',
  },
  google: {
    msg: '구글로 시작하기',
    color: '#484644',
    bgColor: '#DADAE7',
  },
};

const LoginButton = ({ type }: LoginButtonProps) => (
  <Button
    variant="outline"
    w="100%"
    p="24px"
    borderRadius="8px"
    fontSize="16px"
    fontWeight="500"
    color={login[type].color}
    bgColor={login[type].bgColor}
  >
    {login[type].msg}
  </Button>
);

export default LoginButton;
