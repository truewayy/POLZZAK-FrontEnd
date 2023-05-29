import { Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import SearchResult from '@/components/Link/SearchInput/SearchResult';
import { BackIcon } from '@/public/icon';

const FamilySearch = () => {
  const { push } = useRouter();
  const [search, setSearch] = useState('');

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      push(`/link/search?value=${search}`);
    }
  };

  const handleClickBackButton = () => {
    push('/link');
  };

  return (
    <VStack w="100%" minH="100vh" bg="white">
      <VStack w="100%" align="flex-start" bg="white" p="0 5% 26px 5%">
        <Flex w="100%" p="10px 0" pos="fixed" bg="white" zIndex="10">
          <BackIcon w="24px" h="24px" onClick={handleClickBackButton} />
        </Flex>
        <Flex w="100%" p="45px 0 10px 0">
          <Text layerStyle="title1">연동 관리</Text>
        </Flex>
        <Flex w="100%" p="14px 0 24px 0" gap="8px">
          <Input
            variant="unstyled"
            placeholder="닉네임 검색"
            w="85%"
            borderRadius="8px"
            border="1px solid"
            borderColor="gray.300"
            p="12px 16px"
            h="45px"
            fontSize="14px"
            _placeholder={{ color: 'gray.500' }}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchEnter}
          />
          <Button variant="unstyled" w="15%" h="45px">
            <Text layerStyle="body2" color="gray.600">
              취소
            </Text>
          </Button>
        </Flex>
      </VStack>
      <SearchResult />
    </VStack>
  );
};

export default FamilySearch;
