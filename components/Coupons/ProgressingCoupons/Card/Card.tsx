/* eslint-disable no-nested-ternary */
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { Coupon } from '@/apis/coupon';
import { userInfoAtom } from '@/store/userInfo';

import CardView from './CardView';

const Card = ({ reward, rewardDate }: Coupon) => {
  const { push } = useRouter();
  const { memberType } = useRecoilValue(userInfoAtom);

  const isKid = memberType.name === 'KID';

  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  const formattedDate = formatDate(rewardDate);
  const dateCal = Math.floor(
    (new Date(rewardDate).getTime() - new Date().getTime()) /
      1000 /
      60 /
      60 /
      24
  );
  const dateDiff = dateCal > 0 ? `-${dateCal}` : `+${-dateCal}`;

  const handleClickCard = () => {
    push(`/coupon/1`);
  };

  const CardVAProps = {
    reward,
    rewardDate: formattedDate,
    dateDiff,
    isKid,
    handleClickCard,
  };

  return <CardView {...CardVAProps} />;
};

export default Card;
