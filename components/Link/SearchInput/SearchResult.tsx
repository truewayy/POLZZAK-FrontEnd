import { Button, Circle, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { searchFamilies } from '@/apis/family';
import { BigSearchIcon } from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';

const SearchResult = () => {
  const { memberType } = useRecoilValue(userInfoAtom);
  const { query } = useRouter();
  const currentSearch = query.value as string;
  const { data, isLoading } = useQuery(
    ['search', currentSearch],
    () => searchFamilies(currentSearch),
    {
      enabled: !!currentSearch,
    }
  );

  const isKid = memberType.name === 'KID';
  const infoText = isKid ? '연동된 보호자에게' : '연동된 아이에게';
  const infoText2 = isKid
    ? '칭찬 도장판을 받을 수 있어요'
    : '칭찬 도장판을 만들어 줄 수 있어요';

  if (isLoading) {
    return (
      <VStack spacing="16px" justify="center" w="100%" h="300px">
        <Text>
          {currentSearch}님을 <br />
          열심히 찾는 중이에요
        </Text>
      </VStack>
    );
  }
  if (!currentSearch)
    return (
      <VStack spacing="16px" justify="center" w="100%" h="300px">
        <BigSearchIcon w="74px" h="74px" />
        <Text layerStyle="caption2" color="gray.500" textAlign="center">
          {infoText}
          <br />
          {infoText2}
        </Text>
      </VStack>
    );
  if (!data?.data)
    return (
      <VStack spacing="16px" justify="center" w="100%" h="300px">
        <BigSearchIcon w="74px" h="74px" />
        <Text layerStyle="body5" color="gray.700" textAlign="center">
          {currentSearch}님을 <br />
          찾을 수 없어요
        </Text>
      </VStack>
    );
  return (
    <VStack justify="center" w="100%" h="300px" spacing="25px">
      <VStack spacing="10px">
        <Circle
          size={90}
          bgImage={`url(${data.data.profileUrl})`}
          bgSize="cover"
          bgPos="center"
        />
        <Text layerStyle="body5" color="black" textAlign="center">
          {data.data.nickname}
        </Text>
      </VStack>
      <Button variant="unstyled" bgColor="polzzak.default" h="32px" w="91px">
        <Text layerStyle="caption12B" color="white" textAlign="center">
          연동요청
        </Text>
      </Button>
    </VStack>
  );
};

export default SearchResult;
