import { useState } from 'react';
import Swiper from 'swiper';

import { CouponListData } from '@/apis/coupon';

import StampSwiperView from './StampSwiperView';

const StampSwiper = ({ family, coupons }: CouponListData) => {
  const [currentBoard, setCurrentBoard] = useState<number>(1);
  const totalCoupons = coupons.length;
  const progressingCoupons = coupons;

  const handleChangeSwiper: (swiper: Swiper) => void = (swiper) => {
    setCurrentBoard(swiper.activeIndex + 1);
  };

  const StampSwiperVAProps = {
    handleChangeSwiper,
    nickname: family.nickname,
    currentBoard,
    totalCoupons,
    progressingCoupons,
  };

  return <StampSwiperView {...StampSwiperVAProps} />;
};

export default StampSwiper;
