import { useState } from 'react';
import { useQuery } from 'react-query';
import Swiper from 'swiper';

import { CouponListData } from '@/apis/coupon';
import { userInfo } from '@/apis/user';

import StampSwiperView from './StampSwiperView';

const StampSwiper = ({ family, coupons }: CouponListData) => {
  const { data: user } = useQuery(['userInfo'], userInfo);
  const memberType = user?.data?.memberType;
  const [currentBoard, setCurrentBoard] = useState<number>(1);
  const totalCoupons = coupons.length;
  const progressingCoupons = coupons;

  const isKid = memberType?.name === 'KID';

  const handleChangeSwiper: (swiper: Swiper) => void = (swiper) => {
    setCurrentBoard(swiper.activeIndex + 1);
  };

  const StampSwiperVAProps = {
    handleChangeSwiper,
    isKid,
    familyType: family.memberType.detail,
    nickname: family.nickname,
    currentBoard,
    totalCoupons,
    progressingCoupons,
  };

  return <StampSwiperView {...StampSwiperVAProps} />;
};

export default StampSwiper;
