import { Button } from '@chakra-ui/react';

import ROUTES from '@/constants/routes';
import { GoogleIcon, KakaoIcon } from '@/public/icon';

type LoginType = 'kakao' | 'google';

export interface LoginButtonProps {
  type: LoginType;
}

const LoginButton = ({ type }: LoginButtonProps) => {
  const handleClick = () => {
    switch (type) {
      case 'kakao':
        window.location.href = ROUTES.KAKAO_LOGIN;
        break;
      case 'google':
        window.location.href = ROUTES.GOOGLE_LOGIN;
        break;
      default:
        break;
    }
  };

  const LoginButtonVAProps: LoginButtonVAProps = {
    type,
    handleClick,
  };

  return <LoginButtonView {...LoginButtonVAProps} />;
};

interface LoginButtonVAProps {
  type: LoginType;
  handleClick: () => void;
}

const LoginButtonView = ({ type, handleClick }: LoginButtonVAProps) => {
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

  return (
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
};

export default LoginButton;
