import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

import PullToRefresh from '@/components/Common/PullToRefresh';
import SEO from '@/components/Common/SEO';
import Card from '@/components/Main/Card';
import { KidsIcon } from '@/public/icon';

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

const Main = () => {
  const [cards, setCard] = useState<StampData[]>(stampData);

  const handleRefresh = async () => {
    try {
      const response: StampData[] = await axios.get('/api/stamp');
      setCard(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack>
      <SEO title="Polzzak | 메인" />
      <Flex w="100%" p="10px 5% 0px 5%" justify="flex-start" bg="white">
        <KidsIcon w={19} h={19} cursor="pointer" />
      </Flex>
      <Tabs w="100%">
        <TabList>
          <Tab
            w="50%"
            color="#E6E4E2"
            _selected={{ color: 'polzzak.default', borderBottom: '2px solid' }}
            layerStyle="head16B"
          >
            진행 중
          </Tab>
          <Tab
            w="50%"
            color="#E6E4E2"
            _selected={{ color: 'polzzak.default', borderBottom: '2px solid' }}
            layerStyle="head16B"
          >
            완료
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel minH="100vh" p="5%" pb="100px" bg="#F8F8FC">
            <PullToRefresh onRefresh={handleRefresh}>
              <Text layerStyle="head20B" p="20px 0">
                쿼카
              </Text>
              <VStack w="100%" spacing="20px">
                {cards.map(
                  ({
                    id,
                    title,
                    currentStamp,
                    totalStamp,
                    requestCount,
                    reward,
                  }) => (
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
          </TabPanel>
          <TabPanel h="100vh" p="5%" bg="#F8F8FC">
            two!
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default Main;
