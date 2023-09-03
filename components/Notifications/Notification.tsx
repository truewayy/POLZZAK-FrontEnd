import { Box } from '@chakra-ui/react';

import { Notification as NotificationType } from '@/apis/notifications';
import { formatDateDifference } from '@/utils/dateConvert';

import NotificationFrame from './Notification/NotificationFrame';

interface NotificationProps {
  notification: NotificationType;
}

const Notification = ({ notification }: NotificationProps) => (
  <NotificationFrame
    id={notification.id}
    type={notification.type}
    title={notification.title}
    time={formatDateDifference(notification.createdDate)}
    sender={notification.sender.nickname}
    senderProfile={notification.sender.profileUrl}
  >
    <Box dangerouslySetInnerHTML={{ __html: notification.message }} />
  </NotificationFrame>
);
export default Notification;
