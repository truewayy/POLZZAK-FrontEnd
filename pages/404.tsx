import { Text, VStack } from '@chakra-ui/react';

const NotFound = () => (
  <VStack w="100%" minH="100vh" justify="center" spacing="20px">
    <Text layerStyle="subtitle20Sbd">페이지를 찾을 수 없어요!</Text>
    <Text layerStyle="subtitle16Sbd" textAlign="center" color="gray.400">
      주소가 잘못된 것 같아요.
      <br />
      주소를 다시 한번 확인해주세요.
    </Text>
  </VStack>
);

export default NotFound;
