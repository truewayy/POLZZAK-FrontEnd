/* eslint-disable no-nested-ternary */
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { StampBoard } from '@/apis/stamp';
import { CompleteIcon, HandIcon, NoRequestIcon } from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';

import CardView from './CardView';

const Card = ({
  name,
  stampBoardId,
  currentStampCount,
  goalStampCount,
  missionRequestCount,
  reward,
  status,
}: StampBoard) => {
  const { push } = useRouter();
  const { memberType } = useRecoilValue(userInfoAtom);
  const isKid = memberType.name === 'KID';

  const percentage = (currentStampCount / goalStampCount) * 100;
  const isStampBoardComplete = currentStampCount === goalStampCount;
  const isRequest = missionRequestCount !== 0;

  const guardianMessageColor = {
    progress: '',
    completed: 'linear-gradient(90deg, #F0BC05 0%, #F67373 93.23%)',
    issued_coupon: 'linear-gradient(272deg, #A3A1FF 0%, #55DEF1 100%)',
    rewarded: '#FE6E6E',
  };

  const kidMessageColor = {
    progress: '',
    completed: 'linear-gradient(272deg, #A3A1FF 0%, #55DEF1 100%)',
    issued_coupon: 'linear-gradient(90deg, #F0BC05 0%, #F67373 93.23%)',
    rewarded: '#FE6E6E',
  };

  const guardianStampboardMessage = {
    progress: '',
    completed: '쿠폰을 발급해주세요!',
    issued_coupon: '쿠폰 발급 완료!',
    rewarded: '',
  };

  const kidStampboardMessage = {
    progress: '',
    completed: '도장을 다 모았어요!',
    issued_coupon: '쿠폰 선물이 있어요!',
    rewarded: '',
  };

  const statusIcon = isStampBoardComplete ? (
    <CompleteIcon w={76} h={70} />
  ) : isRequest ? (
    <HandIcon w={76} h={67} />
  ) : (
    <NoRequestIcon w={76} h={67} />
  );

  const handleClickCard = () => {
    push(`/stampboard/${stampBoardId}`);
  };

  const CardVAProps = {
    name,
    currentStampCount,
    goalStampCount,
    percentage,
    isStampBoardComplete,
    completeMessage: !isKid
      ? guardianStampboardMessage[status]
      : kidStampboardMessage[status],
    messageColor: !isKid
      ? guardianMessageColor[status]
      : kidMessageColor[status],
    statusIcon,
    isRequest,
    missionRequestCount,
    reward,
    handleClickCard,
  };

  return <CardView {...CardVAProps} />;
};

export default Card;
