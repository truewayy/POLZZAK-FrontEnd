/* eslint-disable no-unsafe-optional-chaining */
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import ROUTES from '@/constants/routes';
import { userInfoAtom } from '@/store/userInfo';

const BasicInfo = dynamic(() => import('@/components/Profile/BasicInfo'), {
  ssr: false,
});

const MyPoint = dynamic(() => import('@/components/Profile/MyPoint'), {
  ssr: false,
});

const Profile = () => {
  const { memberType } = useRecoilValue(userInfoAtom);
  const { push } = useRouter();

  const isKid = memberType.name === 'KID';

  const handleClickCallCenter = () => {
    if (isKid) {
      push(`${ROUTES.PROFILE.CALL_CENTER}?type=kid`);
    } else {
      push(`${ROUTES.PROFILE.CALL_CENTER}?type=guardian`);
    }
  };

  const handleClickAccountManage = () => {
    push(ROUTES.PROFILE.ACCOUNT);
  };

  const handleClickTerms = () => {
    push(`${ROUTES.PROFILE.ROOT}${ROUTES.TERMS}`);
  };

  const handleClickPrivacy = () => {
    push(`${ROUTES.PROFILE.ROOT}${ROUTES.PRIVACY}`);
  };

  const handleClickNotice = () => {
    push(`${ROUTES.PROFILE.ROOT}${ROUTES.NOTICE}`);
  };

  return (
    <VStack w="100%" minH="100vh" pb="100px" spacing="0px">
      <BasicInfo />
      <MyPoint />
      <VStack w="100%" p="0 5%" spacing="26px" bg="white">
        <VStack w="100%" spacing="0px" layerStyle="body14Md" color="gray.800">
          <Box
            w="100%"
            p="20px 0"
            borderBottom="1px solid"
            borderColor="gray.200"
            onClick={handleClickCallCenter}
          >
            고객센터
          </Box>
          <Box
            w="100%"
            p="20px 0"
            borderBottom="1px solid"
            borderColor="gray.200"
            onClick={handleClickNotice}
          >
            공지사항
          </Box>
          <Box
            w="100%"
            p="20px 0"
            borderBottom="1px solid"
            borderColor="gray.200"
            onClick={handleClickAccountManage}
          >
            계정관리
          </Box>
          <Box
            w="100%"
            p="20px 0"
            borderBottom="1px solid"
            borderColor="gray.200"
          >
            버전정보
          </Box>
        </VStack>
        <Flex gap="20px" align="center">
          <Text
            layerStyle="caption13Sbd"
            color="gray.400"
            textDecor="underline"
            cursor="pointer"
            onClick={handleClickTerms}
          >
            이용약관
          </Text>
          <Text
            layerStyle="caption13Sbd"
            color="gray.400"
            textDecor="underline"
            cursor="pointer"
            onClick={handleClickPrivacy}
          >
            개인정보처리방침
          </Text>
        </Flex>
      </VStack>
    </VStack>
  );
};
export default Profile;
