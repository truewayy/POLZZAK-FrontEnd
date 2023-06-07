import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

import SEO from '@/components/Common/SEO';
import AddButton from '@/components/Main/AddButton/AddButton';
import BottomSheetModal from '@/components/Main/BottomSheetModal/BottomSheetModal';
import CompletedStamps from '@/components/Main/CompletedStamps/CompletedStamps';
import Header from '@/components/Main/Header/Header';
import LinkedFilter from '@/components/Main/LinkedFilter/LinkedFilter';
import ProgressingStamps from '@/components/Main/ProgressingStamps/ProgressingStamps';
import { userInfoAtom } from '@/store/userInfo';

const Main = () => {
  const { families } = useRecoilValue(userInfoAtom);
  const noFamiles = families.length === 0;
  return (
    <VStack>
      <SEO title="폴짝! | 메인" />
      <Tabs w="100%">
        <Box w="100%" maxW="560px" pos="fixed" top={0} bg="white" zIndex="3">
          <Header />
          <TabList>
            <Tab
              isDisabled={noFamiles}
              w="50%"
              color="#E6E4E2"
              _selected={{
                color: 'polzzak.default',
                borderBottom: '2px solid',
              }}
              layerStyle="subtitle2"
              _disabled={{
                borderBottom: '2px solid #DADAE7',
                color: '#DADAE7',
                cursor: 'not-allowed',
              }}
            >
              진행 중
            </Tab>
            <Tab
              isDisabled={noFamiles}
              w="50%"
              color="#E6E4E2"
              _selected={{
                color: 'polzzak.default',
                borderBottom: '2px solid',
              }}
              layerStyle="subtitle2"
              _disabled={{
                borderBottom: '2px solid #DADAE7',
                color: '#DADAE7',
                cursor: 'not-allowed',
              }}
            >
              완료
            </Tab>
          </TabList>
        </Box>
        <TabPanels>
          <TabPanel minH="100vh" p="110px 0" pb="100px" bg="#F8F8FC">
            <LinkedFilter />
            <ProgressingStamps />
          </TabPanel>
          <TabPanel minH="100vh" p="110px 0" pb="100px" bg="#F8F8FC">
            <LinkedFilter />
            <CompletedStamps />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <BottomSheetModal />
      <AddButton />
    </VStack>
  );
};

export default Main;
