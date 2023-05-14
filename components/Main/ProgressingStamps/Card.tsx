/* eslint-disable no-nested-ternary */
import { useRecoilValue } from 'recoil';

import { CompleteIcon, HandIcon, NoRequestIcon } from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';

import CardView from './CardView';

interface CardProps {
  title: string;
  currentStamp: number;
  totalStamp: number;
  requestCount: number;
  reward: string;
  isCouponIssued: boolean;
}

const Card = ({
  title,
  currentStamp,
  totalStamp,
  requestCount,
  reward,
  isCouponIssued,
}: CardProps) => {
  const { type } = useRecoilValue(userInfoAtom);
  const percentage = (currentStamp / totalStamp) * 100;
  const isStampBoardComplete = currentStamp === totalStamp;
  const isRequest = requestCount !== 0;

  const completeType = () => {
    if (type === 'KID') {
      if (isCouponIssued) {
        return 'kidCoupon';
      }
      return 'kidComplete';
    }
    if (isCouponIssued) {
      return 'parentCoupon';
    }
    return 'parentComplete';
  };

  const completeMessage = {
    kidCoupon: '쿠폰 선물이 있어요!',
    kidComplete: '수고했어요!',
    parentCoupon: '쿠폰 발급 완료!',
    parentComplete: '쿠폰을 발급해주세요!',
  };

  const messageColor = {
    kidCoupon: '#FE6E6E',
    kidComplete: '#59B9FF',
    parentCoupon: '#59B9FF',
    parentComplete: '#FE6E6E',
  };

  const statusIcon = isStampBoardComplete ? (
    <CompleteIcon w={76} h={70} />
  ) : isRequest ? (
    <HandIcon w={76} h={67} />
  ) : (
    <NoRequestIcon w={76} h={67} />
  );

  const CardVAProps = {
    title,
    currentStamp,
    totalStamp,
    percentage,
    isStampBoardComplete,
    completeMessage: completeMessage[completeType()],
    messageColor: messageColor[completeType()],
    statusIcon,
    isRequest,
    requestCount,
    reward,
  };

  return <CardView {...CardVAProps} />;
};

export default Card;
