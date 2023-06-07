import { Spinner, VStack } from '@chakra-ui/react';

const LoadingView = () => (
  <VStack minH="100vh" justify="center">
    <Spinner
      size="xl"
      color="blue.400"
      emptyColor="polzzak.disabled"
      thickness="3px"
    />
  </VStack>
);
export default LoadingView;
