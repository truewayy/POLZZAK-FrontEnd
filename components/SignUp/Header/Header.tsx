import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import { signUpInfoDefaultValue } from '@/constants/defaultValue';
import { signUpInfoAtom } from '@/store/userInfo';

import HeaderView from './HeaderView';

interface ProgressDots {
  [key: string]: boolean[];
}

const Header = () => {
  const { pathname } = useRouter();
  const [signUpInfo, setSignuUpInfo] = useRecoilState(signUpInfoAtom);
  const { push, back } = useRouter();

  const isTypeKid = signUpInfo.memberType === 'KID';

  const isSelectTypePage = pathname === '/oauth/signup/type';

  const parentProgress: ProgressDots = {
    parent: [true, false, false],
    nickname: [true, true, false],
    profile: [true, true, true],
  };

  const kidProgress: ProgressDots = {
    nickname: [true, false],
    profile: [true, true],
  };

  const progress = () => {
    if (isTypeKid) {
      return kidProgress[pathname.replace('/oauth/signup/', '')];
    }
    return parentProgress[pathname.replace('/oauth/signup/', '')];
  };

  const goBack = () => {
    if (isSelectTypePage) {
      setSignuUpInfo(signUpInfoDefaultValue);
      push('/');
    } else {
      back();
    }
  };

  const HeaderVAProps = {
    isSelectTypePage,
    progress: progress(),
    goBack,
  };

  return <HeaderView {...HeaderVAProps} />;
};

export default Header;
