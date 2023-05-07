import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import { signUpInfoDefaultValue } from '@/constants/defaultValue';
import { signUpInfoAtom } from '@/store/userInfo';

import HeaderView from './HeaderView';

const Header = () => {
  const { pathname } = useRouter();
  const setSignuUpInfo = useSetRecoilState(signUpInfoAtom);
  const { push, back } = useRouter();

  const isSelectTypePage = pathname === '/oauth/signup/type';

  const goBack = () => {
    if (isSelectTypePage) {
      setSignuUpInfo(signUpInfoDefaultValue);
      push('/');
    } else {
      back();
    }
  };

  const HeaderVAProps = {
    goBack,
  };

  return <HeaderView {...HeaderVAProps} />;
};

export default Header;
