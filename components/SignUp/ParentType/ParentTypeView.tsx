import 'swiper/css';

import { Box } from '@chakra-ui/react';
import Swiper, { EffectCoverflow } from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

import NextStepButton from '../Button';

interface ParentTypeVAProps {
  handleChangeSwiper: (swiper: Swiper) => void;
  handleClickButton: () => void;
  currentParentType: number;
  parentTypes: {
    memberTypeDetailId: number;
    detail: string;
  }[];
  buttonDisabled: boolean;
}

const ParentTypeView = ({
  handleChangeSwiper,
  handleClickButton,
  currentParentType,
  parentTypes,
  buttonDisabled,
}: ParentTypeVAProps) => (
  <Box w="100%" h="120px" overflow="hidden">
    <SwiperComponent
      height={80}
      effect="coverflow"
      modules={[EffectCoverflow]}
      direction="vertical"
      slidesPerView={3}
      loop
      loopedSlides={5}
      spaceBetween={-15}
      centeredSlides
      slideToClickedSlide
      grabCursor
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      onSlideChange={handleChangeSwiper}
    >
      {parentTypes.map(({ memberTypeDetailId, detail }) => (
        <SwiperSlide key={memberTypeDetailId}>
          <Box
            p="20px"
            bg="white"
            layerStyle="body16M"
            boxShadow="0px 2px 8px rgba(99, 99, 99, 0.2)"
            border="1px solid #E6E4E2"
            borderRadius="8px"
            textAlign="center"
            color="#DADADA"
            {...(currentParentType === memberTypeDetailId && {
              borderColor: 'polzzak.default',
              color: 'polzzak.default',
              bg: 'blue.100',
            })}
          >
            {detail}
          </Box>
        </SwiperSlide>
      ))}
    </SwiperComponent>
    <NextStepButton disabled={buttonDisabled} onClick={handleClickButton}>
      다음
    </NextStepButton>
  </Box>
);

export default ParentTypeView;
