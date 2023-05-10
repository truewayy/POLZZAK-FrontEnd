import { Spinner, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { login } from '@/apis/auth';
import { TOKEN_KEY } from '@/constants/auth';
import ROUTES, { redirectUri } from '@/constants/routes';
import { signUpInfoAtom } from '@/store/userInfo';
import { setLocalStorage } from '@/utils/storage';

const Redirect = () => {
  const { query, isReady, push } = useRouter();
  const setSignUpInfo = useSetRecoilState(signUpInfoAtom);

  const loginType = query.type as 'kakao' | 'google';
  const authenticationCode = query.code as string;

  useEffect(() => {
    if (!isReady) return;
    if (!authenticationCode) return;
    const fetchCode = async () => {
      const { code, data } = await login(
        loginType,
        authenticationCode,
        redirectUri[loginType] as string
      );
      if (code === 200 && 'accessToken' in data) {
        setLocalStorage(TOKEN_KEY, data.accessToken);
        push(ROUTES.MAIN);
      } else if (code === 412) {
        setSignUpInfo((prev) => ({
          ...prev,
          ...data,
        }));
        push(ROUTES.SIGNUP.TYPE);
      }
    };
    fetchCode();
  }, [isReady, authenticationCode, loginType, push, setSignUpInfo]);

  return (
    <VStack minH="100vh" justify="center">
      <Spinner
        size="xl"
        color="blue.400"
        emptyColor="polzzak.disabled"
        thickness="3px"
      />
    </VStack>
  );
};
export default Redirect;
