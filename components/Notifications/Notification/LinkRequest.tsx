import { Text } from '@chakra-ui/react';

import NotificationFrame from './NotificationFrame';

const LinkRequestNotification = () => (
  <NotificationFrame
    id={1}
    type="linkRequest"
    emoticon="💌"
    title="연동 요청"
    time="방금 전"
    sender="죽음의 ASMR"
  >
    <Text as="span" layerStyle="body14Sbd">
      죽음의 ASMR
    </Text>
    님이 회원님께 연동 요청을 보냈어요
  </NotificationFrame>
);

export default LinkRequestNotification;
