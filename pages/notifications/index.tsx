import { Flex, Text, VStack } from '@chakra-ui/react';

import Notification from '@/components/Notifications/Notification';

const Notifications = () => (
  <VStack w="100%" minH="100vh" bg="gray.100" spacing="0px">
    <Flex w="100%" p="27px 0" bg="white" justify="center">
      <Text layerStyle="title22Sbd">알림</Text>
    </Flex>
    <VStack w="100%" p="15px 5%" spacing="8px">
      <Notification userType="GUARDIAN" notificationType="linkRequest" />
    </VStack>
  </VStack>
);

export default Notifications;
