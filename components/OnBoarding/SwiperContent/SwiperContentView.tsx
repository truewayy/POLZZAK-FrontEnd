import 'swiper/css';
import 'swiper/css/pagination';

import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Swiper, { Pagination } from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

import NextStepButton from '@/components/SignUp/Button';

import Frame from '../Frame';

interface SwiperContentVAProps {
  handleSlideRef: (swiper: Swiper) => void;
  handleChangeSlide: (swiper: Swiper) => void;
  handleClickButton: () => void;
  slideContents: {
    title: string;
    title2?: string;
    description: string;
    description2?: string;
  }[];
  buttonMsg: string;
}

const SwiperContentView = ({
  handleChangeSlide,
  handleSlideRef,
  handleClickButton,
  slideContents,
  buttonMsg,
}: SwiperContentVAProps) => (
  <Box w="100%" minH="100vh" pos="relative">
    <CustomSwiper
      slidesPerView={1}
      autoplay
      centeredSlides
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      onSwiper={handleSlideRef}
      onSlideChange={handleChangeSlide}
      cssMode
    >
      {slideContents.map(({ title, title2, description, description2 }) => (
        <SwiperSlide key={title}>
          <Frame
            title={title}
            title2={title2}
            description={description}
            description2={description2}
          />
        </SwiperSlide>
      ))}
    </CustomSwiper>
    <NextStepButton disabled={false} onClick={handleClickButton}>
      {buttonMsg}
    </NextStepButton>
  </Box>
);

export default SwiperContentView;

const CustomSwiper = styled(SwiperComponent)`
  .swiper-pagination {
    bottom: 10px;
    .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
      background-color: #eeeef4;
      opacity: 1;
      &-active {
        background-color: #84ccff;
      }
    }
  }
`;
