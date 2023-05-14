import { useState } from 'react';
import Swiper from 'swiper';

import StampSwiperView from './StampSwiperView';

interface StampSwiperProps {
  nickname: string;
  stamps: {
    progressing: {
      id: number;
      title: string;
      currentStamp: number;
      totalStamp: number;
      requestCount: number;
      reward: string;
      isCouponIssued: boolean;
    }[];
  };
}

const StampSwiper = ({ nickname, stamps }: StampSwiperProps) => {
  const [currentBoard, setCurrentBoard] = useState<number>(1);
  const totalBoard = stamps.progressing.length;
  const progressingBoard = stamps.progressing;

  const handleChangeSwiper: (swiper: Swiper) => void = (swiper) => {
    setCurrentBoard(swiper.activeIndex + 1);
  };

  const StampSwiperVAProps = {
    handleChangeSwiper,
    nickname,
    currentBoard,
    totalBoard,
    progressingBoard,
  };

  return <StampSwiperView {...StampSwiperVAProps} />;
};

export default StampSwiper;
