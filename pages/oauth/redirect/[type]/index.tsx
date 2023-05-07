import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { login } from '@/apis/auth';
import ROUTES, { redirectUri } from '@/constants/routes';
import { signUpInfoAtom } from '@/store/userInfo';

const Redirect = () => {
  const { query, isReady, push } = useRouter();
  const setSignUpInfo = useSetRecoilState(signUpInfoAtom);

  const loginType = query.type as 'kakao' | 'google';
  const authenticationCode = query.code as string;

  useEffect(() => {
    if (!isReady) return;
    if (!authenticationCode) return;
    const fetchCode = async () => {
      const res = await login(
        loginType,
        authenticationCode,
        redirectUri[loginType] as string
      );
      if (res.code === 200) {
        push('/');
      } else if (res.code === 412) {
        setSignUpInfo((prev) => ({
          ...prev,
          ...res.data,
        }));
        push(ROUTES.SIGNUP.TYPE);
      }
    };
    fetchCode();
  }, [isReady, authenticationCode, loginType, push, setSignUpInfo]);

  return <div>redirect</div>;
};
export default Redirect;
