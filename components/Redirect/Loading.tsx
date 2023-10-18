import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { getAuthToken, login } from '@/apis/auth';
import { TOKEN_KEY } from '@/constants/auth';
import ROUTES from '@/constants/routes';
import { signUpInfoAtom } from '@/store/userInfo';
import { setLocalStorage } from '@/utils/storage';

import LoadingView from './LoadingView';

const Loading = () => {
  const { query, isReady, push } = useRouter();
  const setSignUpInfo = useSetRecoilState(signUpInfoAtom);

  const loginType = query.type as 'kakao' | 'google';
  const authenticationCode = query.code as string;

  useEffect(() => {
    if (!isReady) return;
    if (!authenticationCode) return;

    const fetchCode = async () => {
      const oAuthAccessToken = await getAuthToken(
        loginType,
        authenticationCode
      );
      const { code, data } = await login(loginType, oAuthAccessToken);
      if (code === 200 && 'accessToken' in data) {
        setLocalStorage(TOKEN_KEY, data.accessToken);
        setLocalStorage('lastLoginType', loginType);
        push(ROUTES.MAIN);
      } else if (code === 412) {
        setSignUpInfo((prev) => ({
          ...prev,
          ...data,
        }));
        push(ROUTES.SIGNUP.TERMS);
      }
    };
    fetchCode();
  }, [isReady, authenticationCode, loginType, push, setSignUpInfo]);

  return <LoadingView />;
};
export default Loading;
