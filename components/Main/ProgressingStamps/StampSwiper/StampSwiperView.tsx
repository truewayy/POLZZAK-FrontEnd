import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import Swiper from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

import { StampBoard } from '@/apis/stamp';
import { NoStampboardIcon } from '@/public/icon';

import Card from '../Card/Card';

interface StampSwiperVAProps {
  handleChangeSwiper: (swiper: Swiper) => void;
  isKid: boolean;
  currentFilterMemberType: string;
  nickname: string;
  currentBoard: number;
  totalBoard: number;
  progressingBoard: StampBoard[];
}

const StampSwiperView = ({
  handleChangeSwiper,
  isKid,
  currentFilterMemberType,
  nickname,
  currentBoard,
  totalBoard,
  progressingBoard,
}: StampSwiperVAProps) => (
  <Box key={nickname}>
    <Flex justify="flex-start" align="center" p="0 7.5%" mb="16px" gap="6px">
      {isKid && (
        <Box
          p="4px 8px"
          bg="gray.200"
          border="1px solid rgba(0, 0, 0, 0.12)"
          borderRadius="8px"
          layerStyle="body14Sbd"
          color="gray.700"
          mr="2px"
        >
          {currentFilterMemberType}
        </Box>
      )}
      <Text layerStyle="subtitle18Sbd">
        {nickname}
        <Text as="span" layerStyle="subtitle18Rg" color="gray.600">
          님과 함께해요
        </Text>
      </Text>
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
            layerStyle="body14Md"
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
        spacing="13px"
      >
        <NoStampboardIcon w="98px" h="92px" />
        <Text layerStyle="body14Md" textAlign="center" color="gray.700">
          <Text as="span" layerStyle="body14Bd">
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
