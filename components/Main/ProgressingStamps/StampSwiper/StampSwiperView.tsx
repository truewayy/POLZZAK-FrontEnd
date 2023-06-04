import { Box, Flex, Text } from '@chakra-ui/react';
import Swiper from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

import { StampBoard } from '@/apis/stamp';

import Card from '../Card/Card';

interface StampSwiperVAProps {
  handleChangeSwiper: (swiper: Swiper) => void;
  nickname: string;
  currentBoard: number;
  totalBoard: number;
  progressingBoard: StampBoard[];
}

const StampSwiperView = ({
  handleChangeSwiper,
  nickname,
  currentBoard,
  totalBoard,
  progressingBoard,
}: StampSwiperVAProps) => (
  <Box key={nickname}>
    <Flex justify="space-between" align="center" p="0 7.5%" mb="16px">
      <Text layerStyle="subtitle1">
        {nickname}
        <Text as="span" layerStyle="subtitle6" color="gray.600">
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
          missionRequestCount,
          reward,
          status,
        }) => (
          <SwiperSlide key={stampBoardId}>
            <Card
              stampBoardId={stampBoardId}
              name={name}
              currentStampCount={currentStampCount}
              goalStampCount={goalStampCount}
              missionRequestCount={missionRequestCount}
              reward={reward}
              status={status}
            />
          </SwiperSlide>
        )
      )}
    </SwiperComponent>
  </Box>
);

export default StampSwiperView;
