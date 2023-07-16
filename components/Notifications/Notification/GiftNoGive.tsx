import { Text } from '@chakra-ui/react';

import NotificationFrame from './NotificationFrame';

const GiftNoGiveNotification = () => (
  <NotificationFrame
    id={10}
    type="giftNogive"
    emoticon="☠️️️"
    title="선물 약속 어김"
    time="05.03"
    sender="죽음의 ASMR"
  >
    실망이에요..
    <Text as="span" layerStyle="body14Sbd">
      ‘올리브영 기프티콘 5만원권’{' '}
    </Text>
    선물 약속을 어기셨어요
  </NotificationFrame>
);

export default GiftNoGiveNotification;
