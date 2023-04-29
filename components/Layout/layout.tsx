import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Menus, { menus } from '../Menus';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  const { pathname } = useRouter();
  const isMenu = menus.some(({ path }) => pathname === path);
  return (
    <VStack
      align="stretch"
      justify="stretch"
      maxW="560px"
      m="auto"
      minH="100vh"
      spacing={0}
      overflow="hidden"
    >
      {children}
      {isMenu && <Menus />}
    </VStack>
  );
}

export default Layout;
