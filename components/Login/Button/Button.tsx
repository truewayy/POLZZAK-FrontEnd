import { useEffect, useState } from 'react';

import ROUTES from '@/constants/routes';
import { getLocalStorage } from '@/utils/storage';

import LoginButtonView from './ButtonView';

type LoginType = 'kakao' | 'google';

export interface LoginButtonProps {
  type: LoginType;
}

const LoginButton = ({ type }: LoginButtonProps) => {
  const [isLastLoginButton, setIsLastLoginButton] = useState(false);
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

  useEffect(() => {
    const lastLoginType = getLocalStorage('lastLoginType');
    setIsLastLoginButton(lastLoginType === type);
  }, [type]);

  const LoginButtonVAProps = {
    type,
    isLastLoginButton,
    handleClick,
  };

  return <LoginButtonView {...LoginButtonVAProps} />;
};
export default LoginButton;
