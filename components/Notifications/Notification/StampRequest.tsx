import { Text } from '@chakra-ui/react';

import NotificationFrame from './NotificationFrame';

const StampRequestNotification = () => (
  <NotificationFrame
    id={5}
    type="stampRequest"
    emoticon="✊🏻"
    title="도장 요청"
    time="2일 전"
    sender="죽음의 ASMR"
  >
    <Text as="span" layerStyle="body14Sbd">
      ‘일찍 자기 프로젝트’{' '}
    </Text>
    도장판에 도장을 찍어주세요!
  </NotificationFrame>
);

export default StampRequestNotification;
