import { Box, Flex, Text, VStack } from '@chakra-ui/react';
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
    <Flex align="center" p="0 7.5%" mb="16px" gap="8px">
      <Text as="span" layerStyle="subtitle2" color="blue.500">
        To
      </Text>
      <Text layerStyle="subtitle1">{nickname}</Text>
    </Flex>
    {progressingBoard.length > 0 ? (
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
        {progressingBoard.length > 0 && (
          <Text
            pt="8px"
            w="100%"
            textAlign="center"
            layerStyle="body3"
            letterSpacing="tight"
          >
            {currentBoard}{' '}
            <Text as="span" color="gray.500">
              / {totalBoard}
            </Text>
          </Text>
        )}
      </SwiperComponent>
    ) : (
      <VStack
        m="0 7%"
        mb="30px"
        bg="white"
        h="410px"
        border="1px dashed #DADAE7"
        borderRadius="8px"
        justifyContent="center"
      >
        <Text layerStyle="body3" textAlign="center" color="gray.700">
          <Text as="span" layerStyle="body5">
            {nickname}
          </Text>
          님과
          <br /> 진행 중인 도장판이 없어요
        </Text>
      </VStack>
    )}
  </Box>
);

export default StampSwiperView;