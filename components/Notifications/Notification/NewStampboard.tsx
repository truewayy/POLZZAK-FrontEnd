import { Text } from '@chakra-ui/react';

import NotificationFrame from './NotificationFrame';

const NewStampboardNotification = () => (
  <NotificationFrame
    id={10}
    type="newStampboard"
    emoticon="🥁️️"
    title="새로운 도장판 도착"
    time="05.03"
    sender="죽음의 ASMR"
  >
    <Text as="span" layerStyle="body14Sbd">
      ‘지각 안하기 프로젝트’{' '}
    </Text>
    도장판이 만들어졌어요. 미션 수행 시~작!
  </NotificationFrame>
);

export default NewStampboardNotification;
