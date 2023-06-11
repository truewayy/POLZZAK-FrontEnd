import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import LinkedFamily from '@/components/Link/LinkedFamily';
import RequestList from '@/components/Link/RequestList';
import SearchInput from '@/components/Link/SearchInput/SearchInput';
import ROUTES from '@/constants/routes';
import { BackIcon } from '@/public/icon';

const Link = () => {
  const { push } = useRouter();

  const handleClickBackButton = () => {
    push(ROUTES.MAIN);
  };

  return (
    <VStack w="100%" minH="100vh" bg="white">
      <VStack w="100%" align="flex-start" bg="white" p="0 5% 26px 5%">
        <Flex w="100%" p="10px 0" pos="fixed" bg="white">
          <BackIcon w="24px" h="24px" onClick={handleClickBackButton} />
        </Flex>
        <Flex w="100%" p="45px 0 10px 0">
          <Text layerStyle="title1">연동 관리</Text>
        </Flex>
        <Flex w="100%" p="14px 0 24px 0">
          <SearchInput />
        </Flex>
        <RequestList />
      </VStack>
      <Box w="100%" h="8px" bg="gray.100" />
      <LinkedFamily />
    </VStack>
  );
};

export default Link;
