import { useState } from 'react';
import Swiper from 'swiper';

import { ProcessingStampBoardPreview } from '@/interfaces/stampBoard';

import StampSwiperView from './StampSwiperView';

interface StampSwiperProps {
  nickname: string;
  stamps: ProcessingStampBoardPreview[];
}

const StampSwiper = ({ nickname, stamps }: StampSwiperProps) => {
  const [currentBoard, setCurrentBoard] = useState<number>(1);
  const totalBoard = stamps.length;
  const progressingBoard = stamps;

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
