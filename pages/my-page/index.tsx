/* eslint-disable no-unsafe-optional-chaining */
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const BasicInfo = dynamic(() => import('@/components/Profile/BasicInfo'), {
  ssr: false,
});

const MyPoint = dynamic(() => import('@/components/Profile/MyPoint'), {
  ssr: false,
});

const Profile = () => (
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
        >
          고객센터
        </Box>
        <Box
          w="100%"
          p="20px 0"
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          공지사항
        </Box>
        <Box
          w="100%"
          p="20px 0"
          borderBottom="1px solid"
          borderColor="gray.200"
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
        <Text layerStyle="caption13Sbd" color="gray.400" textDecor="underline">
          이용약관
        </Text>
        <Text layerStyle="caption13Sbd" color="gray.400" textDecor="underline">
          개인정보처리방침
        </Text>
      </Flex>
    </VStack>
  </VStack>
);

export default Profile;
