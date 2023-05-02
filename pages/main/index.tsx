import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useRecoilState, useRecoilValue } from 'recoil';

import SEO from '@/components/Common/SEO';
import ProgressingStamps from '@/components/Main/ProgressingStamps';
import { CheckIcon, FilterArrowIcon, LinkIcon } from '@/public/icon';
import { filterAtom, filterModalAtom } from '@/store/filter';
import userInfoAtom from '@/store/userInfo';

const Main = () => {
  const [filterOn, setFilterOn] = useRecoilState(filterModalAtom);
  const [filter, setFilter] = useRecoilState(filterAtom);
  const chainList = useRecoilValue(userInfoAtom);

  const handleClickFilter = () => {
    setFilterOn(!filterOn);
  };

  const handleChangeFilter = (nickname: string) => {
    setFilter(nickname);
    setFilterOn(!filterOn);
  };

  return (
    <VStack>
      <SEO title="Polzzak | 메인" />
      <Flex w="100%" p="10px 5% 0px 5%" justify="flex-start" bg="white">
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
          <TabPanel minH="100vh" p="5%" pb="100px" bg="#F8F8FC">
            <Flex
              w="100%"
              mb="20px"
              justifyContent="space-between"
              alignItems="center"
              cursor="pointer"
              onClick={handleClickFilter}
            >
              <Text layerStyle="head20B">
                {filter}
                <Text as="span" layerStyle="body18R">
                  님과 함께해요
                </Text>
              </Text>
              <FilterArrowIcon w={5} h={5} />
            </Flex>
            <ProgressingStamps />
          </TabPanel>
          <TabPanel h="100vh" p="5%" bg="#F8F8FC">
            two!
          </TabPanel>
        </TabPanels>
      </Tabs>
      <BottomSheet
        open={filterOn}
        onDismiss={handleClickFilter}
        scrollLocking={false}
        maxHeight={600}
        defaultSnap={({ maxHeight }) => maxHeight * 0.6}
        snapPoints={({ maxHeight }) => [maxHeight * 0.7, maxHeight * 0.5]}
      >
        <VStack w="100%" h={500} bg="white" p="20px" spacing="20px">
          <Text layerStyle="highlight16SB">누구의 도장판을 볼까요?</Text>
          <VStack w="100%" spacing="10px">
            {chainList.chain.map((chain: string) => (
              <Box
                as="button"
                key={chain}
                w="100%"
                p="12px 16px"
                pos="relative"
                layerStyle="highlight14SB"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="8px"
                textAlign="left"
                bgColor="gray.100"
                onClick={() => handleChangeFilter(chain)}
                {...(filter === chain && {
                  bgColor: 'blue.100',
                  borderColor: 'polzzak.default',
                  color: 'polzzak.default',
                })}
              >
                {chain}
                {filter === chain && (
                  <CheckIcon
                    pos="absolute"
                    right="16px"
                    top="50%"
                    transform="translateY(-50%)"
                  />
                )}
              </Box>
            ))}
          </VStack>
        </VStack>
      </BottomSheet>
    </VStack>
  );
};

export default Main;
