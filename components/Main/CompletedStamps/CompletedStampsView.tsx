import { VStack } from '@chakra-ui/react';

import { StampboardListData } from '@/apis/stamp';
import PullToRefresh from '@/components/Common/PullToRefresh/PullToRefresh';

import Card from './Card/Card';
import StampSwiper from './StampSwiper/StampSwiper';

interface CompletedStampsVAProps {
  handleRefresh: () => Promise<any>;
  cards: StampboardListData[] | undefined | null;
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
          ?.find(({ partner: { nickname } }) => nickname === filter)
          ?.stampBoardSummaries.map(({ stampBoardId, name, reward }) => (
            <Card key={stampBoardId} name={name} reward={reward} />
          ))}
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

export default CompletedStampsView;
