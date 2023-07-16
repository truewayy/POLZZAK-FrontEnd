import { Text } from '@chakra-ui/react';

import NotificationFrame from './NotificationFrame';

const CouponCreateNotification = () => (
  <NotificationFrame
    id={10}
    type="couponCreate"
    emoticon="🎟️️"
    title="쿠폰 발급 완료"
    time="05.03"
    sender="죽음의 ASMR"
  >
    <Text as="span" layerStyle="body14Sbd">
      ‘지각 안하기 프로젝트’{' '}
    </Text>
    도장판에 선물 쿠폰이 도착했어요! 쿠폰을 받으러 가볼까요?
  </NotificationFrame>
);

export default CouponCreateNotification;
