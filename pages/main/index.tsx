import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';

import SEO from '@/components/Common/SEO';
import ProgressingStamps from '@/components/Main/ProgressingStamps';
import { KidsIcon } from '@/public/icon';

const Main = () => (
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
          <ProgressingStamps />
        </TabPanel>
        <TabPanel h="100vh" p="5%" bg="#F8F8FC">
          two!
        </TabPanel>
      </TabPanels>
    </Tabs>
  </VStack>
);

export default Main;
