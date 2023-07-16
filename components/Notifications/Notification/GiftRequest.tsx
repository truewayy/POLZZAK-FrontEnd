import { Text } from '@chakra-ui/react';

import NotificationFrame from './NotificationFrame';

const GiftRequestNotification = () => (
  <NotificationFrame
    id={6}
    type="giftRequest"
    emoticon="⚡️"
    title="선물 조르기"
    time="3일 전"
    sender="죽음의 ASMR"
  >
    <Text as="span" layerStyle="body14Sbd">
      ‘에어팟 맥스’{' '}
    </Text>
    선물을 얼른 받고 싶어요!
  </NotificationFrame>
);

export default GiftRequestNotification;
