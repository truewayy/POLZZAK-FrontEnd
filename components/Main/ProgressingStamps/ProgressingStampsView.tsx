import 'swiper/css/pagination';

import { Text, VStack } from '@chakra-ui/react';

import { StampboardListData } from '@/apis/stamp';
import PullToRefresh from '@/components/Common/PullToRefresh/PullToRefresh';

import Card from './Card/Card';
import StampSwiper from './StampSwiper/StampSwiper';

interface ProgressingStampsVAProps {
  handleRefresh: () => Promise<any>;
  cards: StampboardListData[] | undefined | null;
  filter: string;
}

const ProgressingStampsView = ({
  handleRefresh,
  cards,
  filter,
}: ProgressingStampsVAProps) => (
  <PullToRefresh onRefresh={handleRefresh}>
    {filter !== '전체' ? (
      <VStack w="100%" p="0 5%" spacing="20px">
        {cards?.[0]?.stampBoardSummaries.length === 0 ? (
          <VStack
            w="100%"
            m="0 7%"
            mb="30px"
            bg="white"
            h="410px"
            border="1px dashed #DADAE7"
            borderRadius="8px"
            justifyContent="center"
          >
            <Text layerStyle="body14Md" textAlign="center" color="gray.700">
              <Text as="span" layerStyle="body14Bd">
                {filter}
              </Text>
              님과
              <br /> 진행 중인 도장판이 없어요
            </Text>
          </VStack>
        ) : (
          cards?.[0]?.stampBoardSummaries.map(
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

export default ProgressingStampsView;
