import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import Swiper from 'swiper';

import { onBoardingContents } from '@/constants/defaultValue';
import ROUTES from '@/constants/routes';

import SwiperContentView from './SwiperContentView';

interface SwiperContentProps {
  type: 'kid' | 'parent';
}

const SwiperContent = ({ type }: SwiperContentProps) => {
  const { push } = useRouter();
  const [buttonMsg, setButtonMsg] = useState('다음');
  const swiperRef = useRef<Swiper>();

  const slideContents = onBoardingContents[type];

  const handleClickButton = () => {
    if (swiperRef.current) {
      if (swiperRef.current.realIndex === slideContents.length - 1) {
        push(ROUTES.MAIN);
      }
      swiperRef.current.slideNext();
    }
  };

  const handleSlideRef = (swiper: Swiper) => {
    swiperRef.current = swiper;
  };

  const handleChangeSlide = (swiper: Swiper) => {
    if (swiper.realIndex === slideContents.length - 1) {
      setButtonMsg('시작하기');
    } else {
      setButtonMsg('다음');
    }
  };

  const SwiperContentVAProps = {
    handleChangeSlide,
    handleSlideRef,
    handleClickButton,
    slideContents,
    buttonMsg,
  };

  return <SwiperContentView {...SwiperContentVAProps} />;
};

export default SwiperContent;
