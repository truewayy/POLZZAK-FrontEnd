import { VStack } from '@chakra-ui/react';

import PullToRefresh from '@/components/Common/PullToRefresh/PullToRefresh';
import { CompletedStampBoardPreview } from '@/interfaces/stampBoard';

import Card from './Card/Card';
import StampSwiper from './StampSwiper/StampSwiper';

interface StampData {
  nickname: string;
  stamps: CompletedStampBoardPreview[];
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
          ?.stamps.map(({ stampBoardId, name, reward }) => (
            <Card key={stampBoardId} name={name} reward={reward} />
          ))}
      </VStack>
    ) : (
      cards.map(({ nickname, stamps }) => (
        <StampSwiper key={nickname} nickname={nickname} stamps={stamps} />
      ))
    )}
  </PullToRefresh>
);

export default CompletedStampsView;
