import { useState } from 'react';
import Swiper from 'swiper';

import { CompletedStampBoardPreview } from '@/interfaces/stampBoard';

import StampSwiperView from './StampSwiperView';

interface StampSwiperProps {
  nickname: string;
  stamps: CompletedStampBoardPreview[];
}

const StampSwiper = ({ nickname, stamps }: StampSwiperProps) => {
  const [currentBoard, setCurrentBoard] = useState<number>(1);
  const totalBoard = stamps.length;
  const completedBoard = stamps;

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
