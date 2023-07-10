import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import SEO from '@/components/Common/SEO';
import ProgressingCoupons from '@/components/Coupons/ProgressingCoupons/ProgressingCoupons';
import AddButton from '@/components/Main/AddButton/AddButton';
import BottomSheetModal from '@/components/Main/BottomSheetModal/BottomSheetModal';
import CompletedStamps from '@/components/Main/CompletedStamps/CompletedStamps';
import Header from '@/components/Main/Header/Header';
import LinkedFilter from '@/components/Main/LinkedFilter/LinkedFilter';
import { userInfoAtom } from '@/store/userInfo';

const Coupons = () => {
  const { families, memberType } = useRecoilValue(userInfoAtom);
  const [isNoFamily, setIsNoFamily] = useState(true);
  const [isTypeParent, setIsTypeParent] = useState(true);

  const isShowAddButton = isTypeParent && !isNoFamily;

  useEffect(() => {
    const noKid = memberType.name !== 'KID';
    const noFamily = families.length === 0;

    setIsNoFamily(noFamily);
    setIsTypeParent(noKid);
  }, [families, memberType]);

  return (
    <VStack>
      <SEO title="폴짝! | 메인" />
      <Tabs w="100%">
        <Box w="100%" maxW="560px" pos="fixed" top={0} bg="white" zIndex="3">
          <Header />
          <TabList>
            <Tab
              isDisabled={isNoFamily}
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
              선물 전
            </Tab>
            <Tab
              isDisabled={isNoFamily}
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
              선물받기 완료
            </Tab>
          </TabList>
        </Box>
        <TabPanels>
          <TabPanel minH="100vh" p="110px 0" pb="100px" bg="#F8F8FC">
            {!isNoFamily && <LinkedFilter />}
            <ProgressingCoupons />
          </TabPanel>
          <TabPanel minH="100vh" p="110px 0" pb="100px" bg="#F8F8FC">
            {!isNoFamily && <LinkedFilter />}
            <CompletedStamps />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <BottomSheetModal />
      {isShowAddButton && <AddButton />}
    </VStack>
  );
};

export default Coupons;
