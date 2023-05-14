import { Box, Flex, Text } from '@chakra-ui/react';
import Swiper from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

import Card from '../Card/Card';

interface StampSwiperVAProps {
  handleChangeSwiper: (swiper: Swiper) => void;
  nickname: string;
  currentBoard: number;
  totalBoard: number;
  progressingBoard: {
    id: number;
    title: string;
    currentStamp: number;
    totalStamp: number;
    requestCount: number;
    reward: string;
    isCouponIssued: boolean;
  }[];
}

const StampSwiperView = ({
  handleChangeSwiper,
  nickname,
  currentBoard,
  totalBoard,
  progressingBoard,
}: StampSwiperVAProps) => (
  <Box key={nickname}>
    <Flex justify="space-between" align="center" p="0 5%">
      <Text layerStyle="head20B" mb="13px">
        {nickname}
        <Text as="span" layerStyle="body18R">
          님과 함께해요
        </Text>
      </Text>
      <Text layerStyle="body14M" mb="13px" letterSpacing="tight">
        {currentBoard}{' '}
        <Text as="span" color="gray.500">
          / {totalBoard}
        </Text>
      </Text>
    </Flex>
    <SwiperComponent
      grabCursor
      slidesPerView={1.15}
      height={200}
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
      {progressingBoard.map(
        ({
          id,
          title,
          currentStamp,
          totalStamp,
          requestCount,
          reward,
          isCouponIssued,
        }) => (
          <SwiperSlide key={id}>
            <Card
              title={title}
              currentStamp={currentStamp}
              totalStamp={totalStamp}
              requestCount={requestCount}
              reward={reward}
              isCouponIssued={isCouponIssued}
            />
          </SwiperSlide>
        )
      )}
    </SwiperComponent>
  </Box>
);

export default StampSwiperView;
