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
import { useQuery } from 'react-query';

import { familiesInfo } from '@/apis/family';
import { userInfo } from '@/apis/user';
import SEO from '@/components/Common/SEO';
import BottomSheetModal from '@/components/Coupons/BottomSheetModal/BottomSheetModal';
import CompletedCoupons from '@/components/Coupons/CompletedCoupons/CompletedCoupons';
import Header from '@/components/Coupons/Header/Header';
import LinkedFilter from '@/components/Coupons/LinkedFilter/LinkedFilter';
import ProgressingCoupons from '@/components/Coupons/ProgressingCoupons/ProgressingCoupons';

const Coupons = () => {
  const { data: user } = useQuery(['userInfo'], userInfo);
  const memberType = user?.data?.memberType;
  const { data: my } = useQuery(['families'], familiesInfo);
  const families = my?.data?.families;
  const [isNoFamily, setIsNoFamily] = useState(true);
  const [isTypeParent, setIsTypeParent] = useState(true);

  useEffect(() => {
    const noKid = memberType?.name !== 'KID';
    const noFamily = families?.length === 0;

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
              layerStyle="subtitle16Bd"
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
              layerStyle="subtitle16Bd"
              _disabled={{
                borderBottom: '2px solid #DADAE7',
                color: '#DADAE7',
                cursor: 'not-allowed',
              }}
            >
              {isTypeParent ? '선물 완료' : '선물 받기 완료'}
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
            <CompletedCoupons />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <BottomSheetModal />
    </VStack>
  );
};

export default Coupons;
