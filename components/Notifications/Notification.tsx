import { Box } from '@chakra-ui/react';

import LinkRequestNotification from './Notification/LinkRequest';

type UserType = 'KID' | 'GUARDIAN';
type GuardianNotificationTypes =
  | 'linkRequest'
  | 'linkAccept'
  | 'levelUp'
  | 'levelDown'
  | 'stampRequest'
  | 'giftRequest'
  | 'stampboardComplete'
  | 'giftComplete'
  | 'giftDay'
  | 'giftNoGive';
type ChildNotificationTypes =
  | 'linkRequest'
  | 'linkAccept'
  | 'levelUp'
  | 'newStampboard'
  | 'couponCreate'
  | 'giftDay';

interface Guardian {
  [key: string]: JSX.Element;
}
interface Kid {
  [key: string]: JSX.Element;
}

interface NotificationProps {
  userType: UserType;
  notificationType: GuardianNotificationTypes | ChildNotificationTypes;
}

const Notification = ({ userType, notificationType }: NotificationProps) => {
  const guardianNotificationTypes: Guardian = {
    linkRequest: <LinkRequestNotification />,
    linkAccept: <Box />,
    levelUp: <Box />,
    levelDown: <Box />,
    stampRequest: <Box />,
    giftRequest: <Box />,
    stampboardComplete: <Box />,
    giftComplete: <Box />,
    giftDay: <Box />,
    giftNoGive: <Box />,
  };

  const kidNotificationTypes: Kid = {
    linkRequest: <Box />,
    linkAccept: <Box />,
    levelUp: <Box />,
    newStampboard: <Box />,
    couponCreate: <Box />,
    giftDay: <Box />,
  };

  if (userType === 'KID') {
    return kidNotificationTypes[notificationType];
  }
  return guardianNotificationTypes[notificationType];
};

export default Notification;
