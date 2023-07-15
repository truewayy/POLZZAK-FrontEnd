import { Spinner, Text, VStack } from '@chakra-ui/react';

const LoadingView = () => (
  <VStack minH="100vh" justify="center" spacing="26px">
    <Spinner
      size="xl"
      color="blue.400"
      emptyColor="polzzak.disabled"
      thickness="7px"
    />
    <Text layerStyle="subtitle20Sbd" color="gray.700">
      폴짝의 세계로!
    </Text>
  </VStack>
);
export default LoadingView;
