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
    status={notification.status}
    title={notification.title}
    time={formatDateDifference(notification.createdDate)}
    sender={notification.sender}
    link={notification.link}
  >
    <Box dangerouslySetInnerHTML={{ __html: notification.message }} />
  </NotificationFrame>
);
export default Notification;
