import { Text } from '@chakra-ui/react';

import NotificationFrame from './NotificationFrame';

const GiftConfirmNotification = () => (
  <NotificationFrame
    id={10}
    type="giftConfirm"
    emoticon="🎁️️"
    title="혹시 선물은 잘 받았나요?"
    time="05.03"
    sender="죽음의 ASMR"
  >
    <Text as="span" layerStyle="body14Sbd">
      ‘지각 안하기 프로젝트’{' '}
    </Text>
    선물을 실제로 전달 받았나요? 선물을 받았다면 쿠폰에서 ‘선물 받기 완료’
    버튼을 꼭 눌러주세요!
    <br />
    누르지 않으면 보호자는{' '}
    <Text as="span" layerStyle="body14Sbd">
      100P
    </Text>
    가 깎여요
  </NotificationFrame>
);

export default GiftConfirmNotification;
