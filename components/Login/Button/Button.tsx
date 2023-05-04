import ROUTES from '@/constants/routes';

import LoginButtonView from './ButtonView';

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

  const LoginButtonVAProps = {
    type,
    handleClick,
  };

  return <LoginButtonView {...LoginButtonVAProps} />;
};
export default LoginButton;
