import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { TOKEN_KEY } from '@/constants/auth';
import ROUTES from '@/constants/routes';
import { getLocalStorage } from '@/utils/storage';

import Menus, { menus } from '../Menus';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  const { pathname, push } = useRouter();
  const token = getLocalStorage(TOKEN_KEY);
  const notRequiredToken =
    pathname.includes(ROUTES.LOGIN) ||
    pathname.includes(ROUTES.SIGNUP.ROOT) ||
    pathname.includes(ROUTES.REDIRECT) ||
    pathname.includes('/terms') ||
    pathname.includes('/privacy');

  const isMenu = menus.some(({ path }) => pathname === path);

  // 토큰이 없으면 로그인 페이지로 이동
  useEffect(() => {
    if (!token || !notRequiredToken) {
      push(ROUTES.LOGIN);
    }
  }, [token, push, notRequiredToken]);

  return (
    <VStack
      align="stretch"
      justify="stretch"
      maxW="560px"
      m="auto"
      minH="100vh"
      spacing={0}
    >
      {children}
      {isMenu && <Menus />}
    </VStack>
  );
}

export default Layout;
