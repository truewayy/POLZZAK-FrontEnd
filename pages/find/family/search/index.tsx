import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { searchFamilies } from '@/apis/family';
import SearchResult from '@/components/Link/SearchInput/SearchResult';
import { InputDeleteIcon } from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';

const FamilySearch = () => {
  const { query, push } = useRouter();
  const { memberType } = useRecoilValue(userInfoAtom);
  const [type] = useState(memberType);

  const [search, setSearch] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const currentSearch = query.value as string;
  const { isLoading } = useQuery(
    ['search', currentSearch],
    () => searchFamilies(currentSearch),
    {
      enabled: !!currentSearch,
    }
  );

  const showClearButton = search.length > 0 && isInputFocused;
  const title = type.name === 'KID' ? '보호자 찾기' : '아이 찾기';

  const handleClickDelete = () => {
    setSearch('');
  };

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      push(`/find/family/search?value=${search}`);
    }
  };

  const handleClickBackButton = () => {
    push('/find/family');
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsInputFocused(false);
    }, 1000);
  };

  return (
    <VStack w="100%" minH="100vh" bg="white">
      <VStack w="100%" align="flex-start" bg="white" p="0 5% 26px 5%">
        <Box pos="fixed" maxW="504px" w="90%" p="10px 0" bg="white">
          <Text layerStyle="subtitle18Sbd" textAlign="center">
            {title}
          </Text>
        </Box>
        <Flex w="100%" p="54px 0 24px 0" gap="8px">
          <Box w="100%" pos="relative">
            <Input
              id="search-input"
              variant="unstyled"
              placeholder="닉네임 검색"
              w="100%"
              borderRadius="8px"
              border="1px solid"
              borderColor="gray.300"
              p="12px 16px"
              h="45px"
              fontSize="16px"
              _placeholder={{ color: 'gray.500', fontSize: '14px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchEnter}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              isDisabled={isLoading}
            />
            {showClearButton && (
              <InputDeleteIcon
                w="16px"
                h="16px"
                pos="absolute"
                cursor="pointer"
                top="50%"
                right="16px"
                transform="translateY(-50%)"
                onClick={handleClickDelete}
              />
            )}
          </Box>
          <Button
            variant="unstyled"
            w="15%"
            h="45px"
            onClick={handleClickBackButton}
            isDisabled={isLoading}
          >
            <Text layerStyle="body14Sbd" color="gray.600">
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
