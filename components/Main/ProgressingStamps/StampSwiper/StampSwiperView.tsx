import { Box, Flex, Text } from '@chakra-ui/react';
import Swiper from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

import { ProcessingStampBoardPreview } from '@/interfaces/stampBoard';

import Card from '../Card/Card';

interface StampSwiperVAProps {
  handleChangeSwiper: (swiper: Swiper) => void;
  nickname: string;
  currentBoard: number;
  totalBoard: number;
  progressingBoard: ProcessingStampBoardPreview[];
}

const StampSwiperView = ({
  handleChangeSwiper,
  nickname,
  currentBoard,
  totalBoard,
  progressingBoard,
}: StampSwiperVAProps) => (
  <Box key={nickname}>
    <Flex justify="space-between" align="center" p="0 5%" mb="16px">
      <Text layerStyle="title3">
        {nickname}
        <Text as="span" layerStyle="body18R">
          님과 함께해요
        </Text>
      </Text>
      <Text layerStyle="body3" letterSpacing="tight">
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
          stampBoardId,
          name,
          currentStampCount,
          goalStampCount,
          requestCount,
          reward,
          isCouponIssued,
        }) => (
          <SwiperSlide key={stampBoardId}>
            <Card
              name={name}
              currentStampCount={currentStampCount}
              goalStampCount={goalStampCount}
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
