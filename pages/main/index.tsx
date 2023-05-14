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
import BottomSheetModal from '@/components/Main/BottomSheetModal/BottomSheetModal';
import CompletedStamps from '@/components/Main/CompletedStamps/CompletedStamps';
import LinkedFilter from '@/components/Main/LinkedFilter/LinkedFilter';
import ProgressingStamps from '@/components/Main/ProgressingStamps/ProgressingStamps';
import { LinkIcon } from '@/public/icon';

const Main = () => (
  <VStack>
    <SEO title="폴짝! | 메인" />
    <Flex w="100%" p="10px 5% 0px 5%" justify="flex-end" bg="white">
      <LinkIcon w={19} h={19} cursor="pointer" />
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
        <TabPanel minH="100vh" p="5% 0" pb="100px" bg="#F8F8FC">
          <LinkedFilter />
          <ProgressingStamps />
        </TabPanel>
        <TabPanel minH="100vh" p="5% 0" pb="100px" bg="#F8F8FC">
          <LinkedFilter />
          <CompletedStamps />
        </TabPanel>
      </TabPanels>
    </Tabs>
    <BottomSheetModal />
  </VStack>
);

export default Main;
