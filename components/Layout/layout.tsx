import { VStack } from '@chakra-ui/react';

import Menus from '../Menus';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
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
      <Menus />
    </VStack>
  );
}

export default Layout;
