import { Text, VStack } from '@chakra-ui/react';

import Spinner from '../Common/Spinner';

const LoadingView = () => (
  <VStack minH="100vh" justify="center" spacing="26px">
    <Spinner />
    <Text layerStyle="subtitle20Sbd" color="gray.700">
      폴짝의 세계로!
    </Text>
  </VStack>
);
export default LoadingView;
