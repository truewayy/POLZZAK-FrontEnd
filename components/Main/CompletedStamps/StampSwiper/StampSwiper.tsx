import { useState } from 'react';
import Swiper from 'swiper';

import StampSwiperView from './StampSwiperView';

interface StampSwiperProps {
  nickname: string;
  stamps: {
    completed: {
      id: number;
      title: string;
      reward: string;
    }[];
  };
}

const StampSwiper = ({ nickname, stamps }: StampSwiperProps) => {
  const [currentBoard, setCurrentBoard] = useState<number>(1);
  const totalBoard = stamps.completed.length;
  const completedBoard = stamps.completed;

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
