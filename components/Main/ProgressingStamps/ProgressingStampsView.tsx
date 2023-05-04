import { Box, Text, VStack } from '@chakra-ui/react';
import { EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import PullToRefresh from '@/components/Common/PullToRefresh/PullToRefresh';

import Card from '../Card';

interface ProgressingStampsVAProps {
  handleRefresh: () => Promise<any>;
  cards: StampData[];
  filter: string;
}

interface StampData {
  nickname: string;
  stamps: {
    id: number;
    title: string;
    currentStamp: number;
    totalStamp: number;
    requestCount: number;
    reward: string;
  }[];
}

const ProgressingStampsView = ({
  handleRefresh,
  cards,
  filter,
}: ProgressingStampsVAProps) => (
  <PullToRefresh onRefresh={handleRefresh}>
    {filter !== '전체' ? (
      <VStack w="100%" spacing="20px">
        {cards
          .find(({ nickname }) => nickname === filter)
          ?.stamps.map(
            ({ id, title, currentStamp, totalStamp, requestCount, reward }) => (
              <Card
                key={id}
                title={title}
                currentStamp={currentStamp}
                totalStamp={totalStamp}
                requestCount={requestCount}
                reward={reward}
              />
            )
          )}
      </VStack>
    ) : (
      cards.map(({ nickname, stamps }) => (
        <Box key={nickname}>
          <Text layerStyle="head20B" mb="13px">
            {nickname}
            <Text as="span" layerStyle="body18R">
              님과 함께해요
            </Text>
          </Text>
          <Swiper
            effect="coverflow"
            grabCursor
            modules={[EffectCoverflow]}
            slidesPerView={1.05}
            centeredSlides
            spaceBetween={0}
            coverflowEffect={{
              rotate: 10, // 회전각도
              stretch: 0,
              depth: 100, // 깊이감도
              modifier: 2, //
              slideShadows: false,
            }}
            style={{ marginBottom: '38px' }}
          >
            {stamps.map(
              ({
                id,
                title,
                currentStamp,
                totalStamp,
                requestCount,
                reward,
              }) => (
                <SwiperSlide key={id}>
                  <Card
                    title={title}
                    currentStamp={currentStamp}
                    totalStamp={totalStamp}
                    requestCount={requestCount}
                    reward={reward}
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
        </Box>
      ))
    )}
  </PullToRefresh>
);

export default ProgressingStampsView;
