import CouponCreateNotification from './Notification/CouponCreate';
import GiftCompleteNotification from './Notification/GiftComplete';
import GiftConfirmNotification from './Notification/GiftConfirm';
import GiftDayNotification from './Notification/GiftDay';
import GiftNoGiveNotification from './Notification/GiftNoGive';
import GiftRequestNotification from './Notification/GiftRequest';
import LevelNotification from './Notification/Level';
import LinkAcceptNotification from './Notification/LinkAccept';
import LinkRequestNotification from './Notification/LinkRequest';
import NewStampboardNotification from './Notification/NewStampboard';
import StampboardCompleteNotification from './Notification/StampboardComplete';
import StampRequestNotification from './Notification/StampRequest';

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
  | 'giftConfirm';

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
    linkAccept: <LinkAcceptNotification />,
    levelUp: <LevelNotification type="up" />,
    levelDown: <LevelNotification type="down" />,
    stampRequest: <StampRequestNotification />,
    giftRequest: <GiftRequestNotification />,
    stampboardComplete: <StampboardCompleteNotification />,
    giftComplete: <GiftCompleteNotification />,
    giftDay: <GiftDayNotification />,
    giftNoGive: <GiftNoGiveNotification />,
  };

  const kidNotificationTypes: Kid = {
    linkRequest: <LinkRequestNotification />,
    linkAccept: <LinkAcceptNotification />,
    levelUp: <LevelNotification type="up" />,
    newStampboard: <NewStampboardNotification />,
    couponCreate: <CouponCreateNotification />,
    giftConfirm: <GiftConfirmNotification />,
  };

  if (userType === 'KID') {
    return kidNotificationTypes[notificationType];
  }
  return guardianNotificationTypes[notificationType];
};

export default Notification;
