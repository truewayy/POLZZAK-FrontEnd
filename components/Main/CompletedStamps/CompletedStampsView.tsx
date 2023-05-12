import { Box, Text, VStack } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import PullToRefresh from '@/components/Common/PullToRefresh/PullToRefresh';

import Card from './Card';

interface StampData {
  nickname: string;
  stamps: {
    completed: {
      id: number;
      title: string;
      reward: string;
    }[];
  };
}

interface CompletedStampsVAProps {
  handleRefresh: () => Promise<any>;
  cards: StampData[];
  filter: string;
}

const CompletedStampsView = ({
  handleRefresh,
  cards,
  filter,
}: CompletedStampsVAProps) => (
  <PullToRefresh onRefresh={handleRefresh}>
    {filter !== '전체' ? (
      <VStack w="100%" p="0 5%" spacing="20px">
        {cards
          .find(({ nickname }) => nickname === filter)
          ?.stamps.completed.map(({ id, title, reward }) => (
            <Card key={id} title={title} reward={reward} />
          ))}
      </VStack>
    ) : (
      cards.map(({ nickname, stamps }) => (
        <Box key={nickname}>
          <Text layerStyle="head20B" mb="13px" p="0 5%">
            {nickname}
            <Text as="span" layerStyle="body18R">
              님과 함께해요
            </Text>
          </Text>
          <Swiper
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
          >
            {stamps.completed.map(({ id, title, reward }) => (
              <SwiperSlide key={id}>
                <Card title={title} reward={reward} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      ))
    )}
  </PullToRefresh>
);

export default CompletedStampsView;
