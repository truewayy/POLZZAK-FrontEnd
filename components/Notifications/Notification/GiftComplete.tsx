import { Text } from '@chakra-ui/react';

import NotificationFrame from './NotificationFrame';

const GiftCompleteNotification = () => (
  <NotificationFrame
    id={8}
    type="giftComplete"
    emoticon="🎁️️"
    title="선물 받기 완료"
    time="05.03"
    sender="죽음의 ASMR"
  >
    <Text as="span" layerStyle="body14Sbd">
      ‘올리브영 기프티콘 5만원권’{' '}
    </Text>
    선물 받기 완료! 선물을 주셔서 감사합니다 ❤️
  </NotificationFrame>
);

export default GiftCompleteNotification;
