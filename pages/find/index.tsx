import { Button, Image, Square, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import ROUTES from '@/constants/routes';
import { userInfoAtom } from '@/store/userInfo';

const Find = () => {
  const { push } = useRouter();
  const { memberType } = useRecoilValue(userInfoAtom);

  const [type] = useState(memberType);

  const description1 =
    type.name === 'KID' ? '칭찬 도장판을 받으려면' : '칭찬 도장판을 만들려면';
  const description2 =
    type.name === 'KID' ? '보호자와 연동이 필요해요' : '아이와 연동이 필요해요';
  const buttonMsg = type.name === 'KID' ? '보호자 찾기' : '아이 찾기';

  const searchIcon =
    type.name === 'KID' ? '/kidSearch.png' : 'guardianSearch.png';

  const handleClickFindButton = () => {
    push(ROUTES.FIND_FAMILY);
  };

  const handleClickLaterButton = () => {
    push(ROUTES.MAIN);
  };

  return (
    <VStack w="100%" minH="100vh" bg="white" p="0 5% 26px 5%" pos="relative">
      <VStack w="100%" spacing="42px" pt="80px">
        <Image src={searchIcon} w="180px" />
        <Text w="100%" layerStyle="body18Md" textAlign="center">
          {description1}
          <br />
          {description2}
        </Text>
      </VStack>
      <VStack w="90%" spacing="15px" pos="absolute" bottom="30px" left="5%">
        <Button
          bg="polzzak.default"
          w="100%"
          p="22px"
          borderRadius={10}
          layerStyle="subtitle16Sbd"
          color="white"
          _hover={{ bg: 'polzzak.default' }}
          cursor="pointer"
          onClick={handleClickFindButton}
        >
          {buttonMsg}
        </Button>
        <Button
          bg="white"
          w="100%"
          p="22px"
          border="1px solid"
          borderColor="gray.400"
          borderRadius={10}
          layerStyle="subtitle16Sbd"
          color="gray.400"
          cursor="pointer"
          onClick={handleClickLaterButton}
        >
          나중에 할게요
        </Button>
      </VStack>
    </VStack>
  );
};

export default Find;
