import 'swiper/css/pagination';

import { VStack } from '@chakra-ui/react';

import PullToRefresh from '@/components/Common/PullToRefresh/PullToRefresh';
import { ProcessingStampBoardPreview } from '@/interfaces/stampBoard';

import Card from './Card/Card';
import StampSwiper from './StampSwiper/StampSwiper';

interface ProgressingStampsVAProps {
  handleRefresh: () => Promise<any>;
  cards: StampData[];
  filter: string;
}

interface StampData {
  nickname: string;
  stamps: ProcessingStampBoardPreview[];
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
          ?.stamps.map(
            ({
              stampBoardId,
              name,
              currentStampCount,
              goalStampCount,
              requestCount,
              reward,
              isCouponIssued,
            }) => (
              <Card
                key={stampBoardId}
                name={name}
                currentStampCount={currentStampCount}
                goalStampCount={goalStampCount}
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
