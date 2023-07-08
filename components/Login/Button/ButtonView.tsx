import { Circle } from '@chakra-ui/react';

import { GoogleIcon, KakaoIcon } from '@/public/icon';

type LoginType = 'kakao' | 'google';

interface LoginButtonVAProps {
  type: LoginType;
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

const LoginButtonView = ({ type, handleClick }: LoginButtonVAProps) => (
  <Circle
    size="60px"
    bg={loginStyle[type].bgColor}
    onClick={handleClick}
    border={loginStyle[type].border}
    borderColor={loginStyle[type].borderColor}
  >
    {loginStyle[type].icon}
  </Circle>
);

export default LoginButtonView;
