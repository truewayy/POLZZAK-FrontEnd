import { VStack } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <VStack
      align="stretch"
      justify="stretch"
      maxW="560px"
      p="0 5%"
      m="auto"
      minH="100vh"
      spacing={0}
    >
      {children}
    </VStack>
  );
}

export default Layout;
