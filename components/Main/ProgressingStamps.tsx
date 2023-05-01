import { Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

import PullToRefresh from '../Common/PullToRefresh';
import Card from './Card';

interface StampData {
  id: number;
  title: string;
  currentStamp: number;
  totalStamp: number;
  requestCount: number;
  reward: string;
}

const stampData = [
  {
    id: 1,
    title: '혜인이의 도장판',
    currentStamp: 18,
    totalStamp: 20,
    requestCount: 3,
    reward: '아이스크림',
  },
  {
    id: 2,
    title: '혜인이의 도장판',
    currentStamp: 7,
    totalStamp: 25,
    requestCount: 3,
    reward: '아이유 사인 CD',
  },
  {
    id: 3,
    title: '혜인이의 도장판',
    currentStamp: 15,
    totalStamp: 30,
    requestCount: 3,
    reward: '맥북 프로 16인치',
  },
];

const ProgressingStamps = () => {
  const [cards, setCard] = useState<StampData[]>(stampData);

  const handleRefresh = async () => {
    try {
      const response: StampData[] = await axios.get('/api/stamp');
      setCard(response);
    } catch (error) {
      console.log(error);
    }
  };

  const ProgressingStampsVAProps = {
    handleRefresh,
    cards,
  };

  return <ProgressingStampsView {...ProgressingStampsVAProps} />;
};

interface ProgressingStampsVAProps {
  handleRefresh: () => Promise<any>;
  cards: StampData[];
}

const ProgressingStampsView = ({
  handleRefresh,
  cards,
}: ProgressingStampsVAProps) => (
  <PullToRefresh onRefresh={handleRefresh}>
    <Text layerStyle="head20B" p="20px 0">
      쿼카
    </Text>
    <VStack w="100%" spacing="20px">
      {cards.map(
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
  </PullToRefresh>
);

export default ProgressingStamps;
