import {
  Flex,
  Grid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import LinkedFamily from '@/components/Link/LinkedFamily';
import ReceivedRequest from '@/components/Link/ReceivedRequest';
import SearchInput from '@/components/Link/SearchInput/SearchInput';
import SentRequest from '@/components/Link/SentRequest';
import ROUTES from '@/constants/routes';
import { BackIcon } from '@/public/icon';

const tabStyle = {
  w: '100%',
  color: '#E6E4E2',
  _selected: {
    color: 'polzzak.default',
    borderBottom: '2px solid',
  },
  layerStyle: 'subtitle2',
  _disabled: {
    borderBottom: '2px solid #DADAE7',
    color: '#DADAE7',
    cursor: 'not-allowed',
  },
};

const tabs = {
  0: {
    label: '연동목록',
    path: '/link?tab=linked',
  },
  1: {
    label: '받은 요청',
    path: '/link?tab=received',
  },
  2: {
    label: '보낸 요청',
    path: '/link?tab=sent',
  },
};

const defaultTabIndex = {
  linked: 0,
  received: 1,
  sent: 2,
};

const Link = () => {
  const { push, query } = useRouter();
  const [tabIndex, setTabIndex] = useState(0);

  const tab = query.tab as keyof typeof defaultTabIndex;

  const handleTabsChange = (index: number) => {
    const validTabIndex = index as keyof typeof tabs;
    setTabIndex(index);
    push(tabs[validTabIndex].path);
  };

  const handleClickBackButton = () => {
    push(ROUTES.MAIN);
  };

  return (
    <VStack
      w="100%"
      minH="100vh"
      align="flex-start"
      bg="white"
      p="0 5% 26px 5%"
    >
      <Grid
        pos="fixed"
        w="90%"
        p="10px 0"
        templateColumns="repeat(3, 1fr)"
        bg="white"
      >
        <BackIcon
          w="24px"
          h="24px"
          fill="gray.700"
          onClick={handleClickBackButton}
        />
        <Text layerStyle="subtitle1" textAlign="center">
          연동 관리
        </Text>
      </Grid>
      <Flex w="100%" p="54px 0 24px 0">
        <SearchInput />
      </Flex>
      <Tabs
        w="100%"
        index={defaultTabIndex[tab]}
        tabIndex={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab {...tabStyle}>연동목록</Tab>
          <Tab {...tabStyle}>받은 요청</Tab>
          <Tab {...tabStyle}>보낸 요청</Tab>
        </TabList>
        <TabPanels p="12px 0">
          <TabPanel>
            <LinkedFamily />
          </TabPanel>
          <TabPanel>
            <ReceivedRequest />
          </TabPanel>
          <TabPanel>
            <SentRequest />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <RequestList /> */}
    </VStack>
  );
};

export default Link;
