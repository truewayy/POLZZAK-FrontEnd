import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { getAuthToken, login } from '@/apis/auth';
import { familiesInfo } from '@/apis/family';
import userInfo from '@/apis/user';
import { TOKEN_KEY } from '@/constants/auth';
import ROUTES from '@/constants/routes';
import { signUpInfoAtom, userInfoAtom } from '@/store/userInfo';
import { setLocalStorage } from '@/utils/storage';

import LoadingView from './LoadingView';

const Loading = () => {
  const { query, isReady, push } = useRouter();
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setSignUpInfo = useSetRecoilState(signUpInfoAtom);

  const loginType = query.type as 'kakao' | 'google';
  const authenticationCode = query.code as string;

  useEffect(() => {
    if (!isReady) return;
    if (!authenticationCode) return;

    const getUserInfo = async () => {
      const { data: userData } = await userInfo();
      const { data: familyData } = await familiesInfo();
      if (userData && familyData) {
        return {
          ...userData,
          ...familyData,
        };
      }
      return null;
    };

    const setUserInfoAndPush = async () => {
      const userDetail = await getUserInfo();
      if (userDetail) {
        setUserInfo(userDetail);
        push(ROUTES.MAIN);
      }
    };

    const fetchCode = async () => {
      const oAuthAccessToken = await getAuthToken(
        loginType,
        authenticationCode
      );
      const { code, data } = await login(loginType, oAuthAccessToken);
      if (code === 200 && 'accessToken' in data) {
        setLocalStorage(TOKEN_KEY, data.accessToken);
        setLocalStorage('lastLoginType', loginType);
        await setUserInfoAndPush();
      } else if (code === 412) {
        setSignUpInfo((prev) => ({
          ...prev,
          ...data,
        }));
        push(ROUTES.SIGNUP.TERMS);
      }
    };
    fetchCode();
  }, [
    isReady,
    authenticationCode,
    loginType,
    push,
    setSignUpInfo,
    setUserInfo,
  ]);

  return <LoadingView />;
};
export default Loading;
