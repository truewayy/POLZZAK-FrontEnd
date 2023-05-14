import { Box, Flex, Text } from '@chakra-ui/react';
import Swiper from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

import Card from '../Card/Card';

interface StampSwiperVAProps {
  handleChangeSwiper: (swiper: Swiper) => void;
  nickname: string;
  currentBoard: number;
  totalBoard: number;
  completedBoard: {
    id: number;
    title: string;
    reward: string;
  }[];
}

const StampSwiperView = ({
  handleChangeSwiper,
  nickname,
  currentBoard,
  totalBoard,
  completedBoard,
}: StampSwiperVAProps) => (
  <Box key={nickname}>
    <Flex justify="space-between" align="center" p="0 5%">
      <Text layerStyle="head20B" mb="20px">
        {nickname}
        <Text as="span" layerStyle="body18R">
          님과 함께해요
        </Text>
      </Text>
      <Text layerStyle="body14M" mb="20px" letterSpacing="tight">
        {currentBoard}{' '}
        <Text as="span" color="gray.500">
          / {totalBoard}
        </Text>
      </Text>
    </Flex>
    <SwiperComponent
      grabCursor
      slidesPerView={1.15}
      centeredSlides
      spaceBetween={10}
      coverflowEffect={{
        rotate: 10, // 회전각도
        stretch: 0,
        depth: 100, // 깊이감도
        modifier: 2, //
        slideShadows: false,
      }}
      style={{ marginBottom: '38px' }}
      onSlideChange={handleChangeSwiper}
    >
      {completedBoard.map(({ id, title, reward }) => (
        <SwiperSlide key={id}>
          <Card title={title} reward={reward} />
        </SwiperSlide>
      ))}
    </SwiperComponent>
  </Box>
);

export default StampSwiperView;
