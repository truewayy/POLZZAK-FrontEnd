import { VStack } from '@chakra-ui/react';

import Spinner from './Spinner';

const Loading = () => (
  <VStack
    w="100%"
    h="100vh"
    justify="center"
    align="center"
    pos="fixed"
    top="0"
    left="0"
    zIndex="999"
    spacing="0"
    bg="rgba(0,0,0,0.5)"
  >
    <Spinner />
  </VStack>
);

export default Loading;
