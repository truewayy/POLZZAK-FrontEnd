import 'react-spring-bottom-sheet/dist/style.css';
import 'swiper/css';

import { Box, Skeleton, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { filterAtom } from '@/store/filter';
import userInfoAtom from '@/store/userInfo';

import PullToRefresh from '../Common/PullToRefresh';
import Card from './Card';

interface StampData {
  nickname: string;
  stamps: {
    id: number;
    title: string;
    currentStamp: number;
    totalStamp: number;
    requestCount: number;
    reward: string;
  }[];
}

const totalStampData = [
  {
    nickname: '쿼카',
    stamps: [
      {
        id: 1,
        title: '가나다의 도장판',
        currentStamp: 9,
        totalStamp: 20,
        requestCount: 0,
        reward: '아이스크림',
      },
      {
        id: 2,
        title: '가나다의 도장판',
        currentStamp: 23,
        totalStamp: 25,
        requestCount: 8,
        reward: '아이유 사인 CD',
      },
      {
        id: 3,
        title: '가나다의 도장판',
        currentStamp: 17,
        totalStamp: 30,
        requestCount: 3,
        reward: '맥북 프로 16인치',
      },
    ],
  },
  {
    nickname: '멜론수박',
    stamps: [
      {
        id: 4,
        title: '라마바의 도장판',
        currentStamp: 20,
        totalStamp: 20,
        requestCount: 3,
        reward: '에어팟 프로',
      },
      {
        id: 5,
        title: '라마바의 도장판',
        currentStamp: 2,
        totalStamp: 10,
        requestCount: 2,
        reward: '허니콤보',
      },
      {
        id: 6,
        title: '라마바의 도장판',
        currentStamp: 15,
        totalStamp: 30,
        requestCount: 1,
        reward: '맥북 M1 13인치',
      },
    ],
  },
  {
    nickname: '아이유',
    stamps: [
      {
        id: 7,
        title: '사아자의 도장판',
        currentStamp: 18,
        totalStamp: 20,
        requestCount: 5,
        reward: '오마카세',
      },
      {
        id: 8,
        title: '사아자의 도장판',
        currentStamp: 25,
        totalStamp: 25,
        requestCount: 2,
        reward: '애슐리 퀸즈 상품권',
      },
      {
        id: 9,
        title: '사아자의 도장판',
        currentStamp: 15,
        totalStamp: 30,
        requestCount: 3,
        reward: '폴라로이드 카메라',
      },
    ],
  },
  {
    nickname: '가나다라',
    stamps: [
      {
        id: 1,
        title: '카타파의 도장판',
        currentStamp: 18,
        totalStamp: 20,
        requestCount: 1,
        reward: '아이폰 14 프로 맥스',
      },
      {
        id: 2,
        title: '카타파의 도장판',
        currentStamp: 7,
        totalStamp: 25,
        requestCount: 0,
        reward: '아이패드 프로 12.9인치',
      },
      {
        id: 3,
        title: '카타파의 도장판',
        currentStamp: 15,
        totalStamp: 30,
        requestCount: 2,
        reward: '4k 고해상도 모니터',
      },
    ],
  },
];

const ProgressingStamps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCard] = useState<StampData[]>(totalStampData);
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
    filter,
  };

  return isLoading ? (
    <ProgressingStampsSkeleton filter={filter} />
  ) : (
    <ProgressingStampsView {...ProgressingStampsVAProps} />
  );
};

interface ProgressingStampsVAProps {
  handleRefresh: () => Promise<any>;
  cards: StampData[];
  filter: string;
}

const ProgressingStampsView = ({
  handleRefresh,
  cards,
  filter,
}: ProgressingStampsVAProps) => (
  <PullToRefresh onRefresh={handleRefresh}>
    {filter !== '전체' ? (
      <VStack w="100%" spacing="20px">
        {cards
          .find(({ nickname }) => nickname === filter)
          ?.stamps.map(
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
    ) : (
      totalStampData.map(({ nickname, stamps }) => (
        <Box key={nickname}>
          <Text layerStyle="head20B" mb="13px">
            {nickname}
            <Text as="span" layerStyle="body18R">
              님과 함께해요
            </Text>
          </Text>
          <Swiper
            effect="coverflow"
            grabCursor
            modules={[EffectCoverflow]}
            slidesPerView={1.05}
            centeredSlides
            spaceBetween={0}
            coverflowEffect={{
              rotate: 10, // 회전각도
              stretch: 0,
              depth: 100, // 깊이감도
              modifier: 2, //
              slideShadows: false,
            }}
            style={{ marginBottom: '38px' }}
          >
            {stamps.map(
              ({
                id,
                title,
                currentStamp,
                totalStamp,
                requestCount,
                reward,
              }) => (
                <SwiperSlide key={id}>
                  <Card
                    title={title}
                    currentStamp={currentStamp}
                    totalStamp={totalStamp}
                    requestCount={requestCount}
                    reward={reward}
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
        </Box>
      ))
    )}
  </PullToRefresh>
);

interface ProgressingStampsSkeletonProps {
  filter: string;
}

const ProgressingStampsSkeleton = ({
  filter,
}: ProgressingStampsSkeletonProps) =>
  filter === '전체' ? (
    <VStack w="100%" spacing="32px">
      <VStack w="100%" spacing="13px">
        <Skeleton
          w="50%"
          borderRadius="8px"
          height="30px"
          alignSelf="flex-start"
        />
        <Skeleton w="100%" borderRadius="8px" height="400px" />
      </VStack>
      <VStack w="100%" spacing="13px">
        <Skeleton
          w="50%"
          borderRadius="8px"
          height="30px"
          alignSelf="flex-start"
        />
        <Skeleton w="100%" borderRadius="8px" height="400px" />
      </VStack>
    </VStack>
  ) : (
    <VStack w="100%" spacing="20px">
      <Skeleton w="100%" borderRadius="8px" height="400px" />
      <Skeleton w="100%" borderRadius="8px" height="400px" />
    </VStack>
  );

export default ProgressingStamps;
