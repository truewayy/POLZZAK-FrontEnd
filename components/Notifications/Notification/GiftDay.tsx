import { Text } from '@chakra-ui/react';

import NotificationFrame from './NotificationFrame';

const GiftDayNotification = () => (
  <NotificationFrame
    id={9}
    type="giftDay"
    emoticon="⏱️️️"
    title="선물 약속 날짜 D-1"
    time="05.03"
    sender="죽음의 ASMR"
  >
    잊지 마세요!
    <Text as="span" layerStyle="body14Sbd">
      ‘올리브영 기프티콘 5만원권’{' '}
    </Text>
    선물을 주기로 한 날짜가 하루 남았어요
  </NotificationFrame>
);

export default GiftDayNotification;
