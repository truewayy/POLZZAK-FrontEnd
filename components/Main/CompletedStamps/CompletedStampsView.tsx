import { Text, VStack } from '@chakra-ui/react';

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
        {cards?.[0].stampBoardSummaries.length === 0 ? (
          <VStack
            w="100%"
            m="0 7%"
            mb="30px"
            bg="white"
            h="180px"
            border="1px dashed #DADAE7"
            borderRadius="8px"
            justifyContent="center"
          >
            <Text layerStyle="body14Md" textAlign="center" color="gray.700">
              완료된 도장판이 없어요
            </Text>
          </VStack>
        ) : (
          cards?.[0].stampBoardSummaries.map(
            ({ stampBoardId, name, reward }) => (
              <Card key={stampBoardId} name={name} reward={reward} />
            )
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

export default CompletedStampsView;
