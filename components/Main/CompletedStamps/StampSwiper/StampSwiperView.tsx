import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import Swiper from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

import { CompletedStampBoardPreview } from '@/interfaces/stampBoard';

import Card from '../Card/Card';

interface StampSwiperVAProps {
  handleChangeSwiper: (swiper: Swiper) => void;
  nickname: string;
  currentBoard: number;
  totalBoard: number;
  completedBoard: CompletedStampBoardPreview[];
}

const StampSwiperView = ({
  handleChangeSwiper,
  nickname,
  currentBoard,
  totalBoard,
  completedBoard,
}: StampSwiperVAProps) => (
  <Box key={nickname}>
    <Flex justify="space-between" align="center" p="0 7.5%" mb="16px">
      <Text layerStyle="subtitle1">
        {nickname}
        <Text as="span" layerStyle="subtitle6">
          님과 함께해요
        </Text>
      </Text>
    </Flex>
    {completedBoard.length > 0 ? (
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
        {completedBoard.map(({ stampBoardId, name, reward }) => (
          <SwiperSlide key={stampBoardId}>
            <Card name={name} reward={reward} />
          </SwiperSlide>
        ))}
        {completedBoard.length > 0 && (
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
        h="180px"
        border="1px dashed #DADAE7"
        borderRadius="8px"
        justifyContent="center"
      >
        <Text layerStyle="body3" textAlign="center" color="gray.700">
          완료된 도장판이 없어요
        </Text>
      </VStack>
    )}
  </Box>
);

export default StampSwiperView;
