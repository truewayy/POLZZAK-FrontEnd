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
  | 'FAMILY_REQUEST'
  | 'FAMILY_REQUEST_COMPLETE'
  | 'LEVEL_UP'
  | 'LEVEL_DOWN'
  | 'STAMP_REQUEST'
  | 'REWARD_REQUEST'
  | 'STAMP_BOARD_COMPLETE'
  | 'REWARDED'
  | 'REWARD_REQUEST_AGAIN'
  | 'REWARD_FAIL';
type KidNotificationTypes =
  | 'FAMILY_REQUEST'
  | 'FAMILY_REQUEST_COMPLETE'
  | 'LEVEL_UP'
  | 'CREATED_STAMP_BOARD'
  | 'ISSUED_COUPON'
  | 'REWARDED_REQUEST';

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
    FAMILY_REQUEST: <LinkRequestNotification />,
    FAMILY_REQUEST_COMPLETE: <LinkAcceptNotification />,
    LEVEL_UP: <LevelNotification id={3} type="UP" />,
    LEVEL_DOWN: <LevelNotification id={4} type="DOWN" />,
    STAMP_REQUEST: <StampRequestNotification />,
    REWARD_REQUEST: <GiftRequestNotification />,
    STAMP_BOARD_COMPLETE: <StampboardCompleteNotification />,
    REWARDED: <GiftCompleteNotification />,
    REWARD_REQUEST_AGAIN: <GiftDayNotification />,
    REWARD_FAIL: <GiftNoGiveNotification />,
  };

  const kidNotificationTypes: Kid = {
    FAMILY_REQUEST: <LinkRequestNotification />,
    FAMILY_REQUEST_COMPLETE: <LinkAcceptNotification />,
    LEVEL_UP: <LevelNotification id={4} type="UP" />,
    CREATED_STAMP_BOARD: <NewStampboardNotification />,
    ISSUED_COUPON: <CouponCreateNotification />,
    REWARDED_REQUEST: <GiftConfirmNotification />,
  };

  if (userType === 'KID') {
    return kidNotificationTypes[notificationType];
  }
  return guardianNotificationTypes[notificationType];
};

export default Notification;
