import { useState } from 'react';
import Swiper from 'swiper';

import { StampboardListData } from '@/apis/stamp';

import StampSwiperView from './StampSwiperView';

const StampSwiper = ({
  partner: { nickname },
  stampBoardSummaries,
}: StampboardListData) => {
  const [currentBoard, setCurrentBoard] = useState<number>(1);
  const totalBoard = stampBoardSummaries.length;
  const completedBoard = stampBoardSummaries;

  const handleChangeSwiper: (swiper: Swiper) => void = (swiper) => {
    setCurrentBoard(swiper.activeIndex + 1);
  };

  const StampSwiperVAProps = {
    handleChangeSwiper,
    nickname,
    currentBoard,
    totalBoard,
    completedBoard,
  };

  return <StampSwiperView {...StampSwiperVAProps} />;
};

export default StampSwiper;
