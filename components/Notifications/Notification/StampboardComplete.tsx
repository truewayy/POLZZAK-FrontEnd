import { Text } from '@chakra-ui/react';

import NotificationFrame from './NotificationFrame';

const StampboardCompleteNotification = () => (
  <NotificationFrame
    id={7}
    type="stampboardComplete"
    emoticon="✔️️"
    title="도장판 채우기 완료"
    time="05.01"
    sender="죽음의 ASMR"
  >
    <Text as="span" layerStyle="body14Sbd">
      ‘지각 안 하기 프로젝트’{' '}
    </Text>
    도장판에 도장이 다 모였어요
    <br />
    선물 쿠폰을 발급해주세요!
  </NotificationFrame>
);

export default StampboardCompleteNotification;
