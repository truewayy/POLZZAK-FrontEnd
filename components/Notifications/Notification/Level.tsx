import { Text } from '@chakra-ui/react';

import NotificationFrame from './NotificationFrame';

interface LevelNotificationProps {
  type: 'UP' | 'DOWN';
  id: number;
}

const LevelNotification = ({ type, id }: LevelNotificationProps) => (
  <NotificationFrame
    id={id}
    type="level"
    emoticon={type === 'UP' ? '🥳' : '🚨'}
    title={`레벨 ${type}`}
    time="1분 전"
    sender="죽음의 ASMR"
  >
    {type === 'UP' ? '폴짝' : '조심'}!{' '}
    <Text as="span" layerStyle="body14Sbd">
      4계단
    </Text>
    으로 레벨이 {type === 'UP' ? '올라갔어요' : '내려왔어요'}!
  </NotificationFrame>
);

export default LevelNotification;
