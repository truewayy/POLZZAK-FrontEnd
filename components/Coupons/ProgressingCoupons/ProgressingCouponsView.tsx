import 'swiper/css/pagination';

import { VStack } from '@chakra-ui/react';

import { StampboardListData } from '@/apis/stamp';
import PullToRefresh from '@/components/Common/PullToRefresh/PullToRefresh';

import Card from './Card/Card';
import StampSwiper from './StampSwiper/StampSwiper';

interface ProgressingStampsVAProps {
  handleRefresh: () => Promise<any>;
  cards: StampboardListData[] | undefined | null;
  filter: string;
}

const ProgressingCouponsView = ({
  handleRefresh,
  cards,
  filter,
}: ProgressingStampsVAProps) => (
  <PullToRefresh onRefresh={handleRefresh}>
    {filter !== '전체' ? (
      <VStack w="100%" p="0 5%" spacing="20px">
        {cards
          ?.find(({ partner: { nickname } }) => nickname === filter)
          ?.stampBoardSummaries.map(
            ({
              stampBoardId,
              name,
              currentStampCount,
              goalStampCount,
              missionRequestCount,
              reward,
              status,
            }) => (
              <Card
                key={stampBoardId}
                stampBoardId={stampBoardId}
                name={name}
                currentStampCount={currentStampCount}
                goalStampCount={goalStampCount}
                missionRequestCount={missionRequestCount}
                reward={reward}
                status={status}
              />
            )
          )}
      </VStack>
    ) : (
      cards?.map(({ partner, stampBoardSummaries }) => (
        <StampSwiper
          key={partner.nickname}
          partner={partner}
          stampBoardSummaries={stampBoardSummaries}
        />
      ))
    )}
  </PullToRefresh>
);

export default ProgressingCouponsView;
