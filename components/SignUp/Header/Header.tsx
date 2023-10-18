import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { signUpInfoDefaultValue } from '@/constants/defaultValue';
import { signUpInfoAtom } from '@/store/userInfo';

import HeaderView from './HeaderView';

interface ProgressDots {
  [key: string]: boolean[];
}

const Header = () => {
  const { pathname } = useRouter();
  const [isTypeKid, setIsTypeKid] = useState(false);
  const [signUpInfo, setSignuUpInfo] = useRecoilState(signUpInfoAtom);
  const { push, back } = useRouter();

  const isTermsAgreePage = pathname === '/oauth/signup/terms';

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
    if (isTermsAgreePage) {
      setSignuUpInfo(signUpInfoDefaultValue);
      push('/');
    } else {
      back();
    }
  };

  useEffect(() => {
    if (signUpInfo.memberType === 'KID') {
      setIsTypeKid(true);
    }
  }, [isTypeKid, signUpInfo.memberType]);

  const HeaderVAProps = {
    isTermsAgreePage,
    progress: progress(),
    goBack,
  };

  return <HeaderView {...HeaderVAProps} />;
};

export default Header;
