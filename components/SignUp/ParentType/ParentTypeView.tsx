import 'swiper/css';

import { Box } from '@chakra-ui/react';
import Swiper, { EffectCoverflow } from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

import NextStepButton from '../Button';

interface ParentTypeVAProps {
  handleChangeSwiper: (swiper: Swiper) => void;
  handleClickButton: () => void;
  currentParentType: number;
  savedParentType: number;
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
  savedParentType,
  parentTypes,
  buttonDisabled,
}: ParentTypeVAProps) => (
  <Box w="90%" h="120px" overflow="hidden">
    <SwiperComponent
      height={140}
      effect="coverflow"
      modules={[EffectCoverflow]}
      direction="vertical"
      slidesPerView={2}
      loop
      loopedSlides={3}
      spaceBetween={-100}
      centeredSlides
      grabCursor
      initialSlide={savedParentType - 1}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 500,
        modifier: 1,
        slideShadows: false,
      }}
      onSlideChange={handleChangeSwiper}
    >
      {parentTypes.map(({ memberTypeDetailId, detail }) => (
        <SwiperSlide
          key={memberTypeDetailId}
          defaultChecked={currentParentType === memberTypeDetailId}
          defaultValue={memberTypeDetailId}
        >
          <Box
            p="20px"
            bg="white"
            layerStyle="subtitle16Md"
            boxShadow="0px 2px 8px rgba(99, 99, 99, 0.2)"
            border="1px solid #E6E4E2"
            borderRadius="8px"
            textAlign="center"
            color="#DADADA"
            {...(currentParentType === memberTypeDetailId && {
              borderColor: 'blue.600',
              color: 'blue.600',
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
