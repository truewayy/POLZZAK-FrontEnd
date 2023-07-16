import { Text } from '@chakra-ui/react';

import NotificationFrame from './NotificationFrame';

const LinkAcceptNotification = () => (
  <NotificationFrame
    id={2}
    type="linkAccept"
    emoticon="🤝🏻"
    title="연동 완료"
    time="1분 전"
    sender="죽음의 ASMR"
  >
    <Text as="span" layerStyle="body14Sbd">
      죽음의 ASMR
    </Text>
    님과 연동이 완료되었어요! 도장판을 만들러 가볼까요? :)
  </NotificationFrame>
);

export default LinkAcceptNotification;
