import 'swiper/css/pagination';

import { VStack } from '@chakra-ui/react';

import PullToRefresh from '@/components/Common/PullToRefresh/PullToRefresh';

import Card from './Card';
import StampSwiper from './StampSwiper/StampSwiper';

interface ProgressingStampsVAProps {
  handleRefresh: () => Promise<any>;
  cards: StampData[];
  filter: string;
}

interface StampData {
  nickname: string;
  stamps: {
    progressing: {
      id: number;
      title: string;
      currentStamp: number;
      totalStamp: number;
      requestCount: number;
      reward: string;
      isCouponIssued: boolean;
    }[];
  };
}

const ProgressingStampsView = ({
  handleRefresh,
  cards,
  filter,
}: ProgressingStampsVAProps) => (
  <PullToRefresh onRefresh={handleRefresh}>
    {filter !== '전체' ? (
      <VStack w="100%" p="0 5%" spacing="20px">
        {cards
          .find(({ nickname }) => nickname === filter)
          ?.stamps.progressing.map(
            ({
              id,
              title,
              currentStamp,
              totalStamp,
              requestCount,
              reward,
              isCouponIssued,
            }) => (
              <Card
                key={id}
                title={title}
                currentStamp={currentStamp}
                totalStamp={totalStamp}
                requestCount={requestCount}
                reward={reward}
                isCouponIssued={isCouponIssued}
              />
            )
          )}
      </VStack>
    ) : (
      cards.map(({ nickname, stamps }) => (
        <StampSwiper key={nickname} nickname={nickname} stamps={stamps} />
      ))
    )}
  </PullToRefresh>
);

export default ProgressingStampsView;
