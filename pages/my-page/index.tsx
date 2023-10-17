/* eslint-disable no-unsafe-optional-chaining */
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { userInfo } from '@/apis/user';
import BasicInfo from '@/components/Profile/BasicInfo';
import MyPoint from '@/components/Profile/MyPoint';
import ROUTES from '@/constants/routes';

const Profile = () => {
  const { data: user } = useQuery(['userInfo'], userInfo);
  const memberType = user?.data?.memberType;

  const { push } = useRouter();

  const isKid = memberType?.name === 'KID';

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
            cursor="pointer"
            onClick={handleClickCallCenter}
          >
            고객센터
          </Box>
          <Box
            w="100%"
            p="20px 0"
            borderBottom="1px solid"
            borderColor="gray.200"
            cursor="pointer"
            onClick={handleClickNotice}
          >
            공지사항
          </Box>
          <Box
            w="100%"
            p="20px 0"
            borderBottom="1px solid"
            borderColor="gray.200"
            cursor="pointer"
            onClick={handleClickAccountManage}
          >
            계정관리
          </Box>
          <Flex
            w="100%"
            p="20px 0"
            borderBottom="1px solid"
            borderColor="gray.200"
            justify="space-between"
          >
            <Flex justify="space-between" align="center" gap="12px">
              버전정보
              <Text color="polzzak.default">v1.0</Text>
            </Flex>
          </Flex>
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
