import 'react-spring-bottom-sheet/dist/style.css';

import { Skeleton, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { filterAtom } from '@/store/filter';
import userInfoAtom from '@/store/userInfo';

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
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCard] = useState<StampData[]>(stampData);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const filter = useRecoilValue(filterAtom);

  const handleRefresh = async () => {
    try {
      const response: StampData[] = await axios.get('/api/stamp');
      setCard(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [filter]);

  useEffect(() => {
    if (!userInfo.chains.length) {
      setUserInfo({
        type: '',
        nickname: '',
        profileImage: '',
        chains: ['전체', '쿼카', '멜론수박', '아이유', '가나다라'],
      });
    }
  }, [userInfo, setUserInfo]);

  const ProgressingStampsVAProps = {
    handleRefresh,
    cards,
  };

  return isLoading ? (
    <ProgressingStampsSkeleton />
  ) : (
    <ProgressingStampsView {...ProgressingStampsVAProps} />
  );
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

const ProgressingStampsSkeleton = () => (
  <VStack w="100%" spacing="20px">
    <Skeleton w="100%" borderRadius="8px" height="400px" />
    <Skeleton w="100%" borderRadius="8px" height="400px" />
  </VStack>
);

export default ProgressingStamps;
