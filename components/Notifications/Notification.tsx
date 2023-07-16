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
type KidNotificationTypes =
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

interface NotificationProps<T extends UserType> {
  userType: T;
  notificationType: T extends 'KID'
    ? KidNotificationTypes
    : GuardianNotificationTypes;
}

const Notification = <T extends UserType>({
  userType,
  notificationType,
}: NotificationProps<T>) => {
  const guardianNotificationTypes: Guardian = {
    linkRequest: <LinkRequestNotification />,
    linkAccept: <LinkAcceptNotification />,
    levelUp: <LevelNotification id={3} type="UP" />,
    levelDown: <LevelNotification id={4} type="DOWN" />,
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
    levelUp: <LevelNotification id={4} type="UP" />,
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
