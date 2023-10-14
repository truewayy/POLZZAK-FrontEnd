import { Flex, Grid, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { userInfo } from '@/apis/user';
import { LeftArrow, MinusCircle, NoticeIcon, PlusCircle } from '@/public/icon';

const Rules = () => {
  const { back } = useRouter();
  const { data: user } = useQuery(['userInfo'], userInfo);
  const memberType = user?.data?.memberType;
  const isKid = memberType?.name === 'KID';

  return (
    <VStack
      w="100%"
      minH="100vh"
      p="16px"
      pt="60px"
      bg="gray.100"
      spacing="16px"
    >
      <Grid
        w="100%"
        maxW="560px"
        templateColumns="repeat(3, 1fr)"
        placeItems="center"
        p="10px 16px"
        bg="white"
        pos="fixed"
        top="0"
      >
        <LeftArrow w="10px" h="18px" mr="auto" onClick={back} />
        <Text layerStyle="subtitle18Sbd" color="#1C1C1C">
          포인트 규칙
        </Text>
      </Grid>
      <Flex w="100%" p="0 5px" gap="10px" justify="flex-start" align="center">
        <NoticeIcon w="18px" h="18.55px" />
        <Text layerStyle="body13Md">100P를 모을 때마다 1계단을 올라가요!</Text>
      </Flex>
      <VStack
        w="100%"
        p="16px"
        align="flex-start"
        spacing="16px"
        bg="white"
        border="1px solid"
        borderColor="gray.300"
        borderRadius="8px"
      >
        <Text layerStyle="subtitle16Sbd" color="#000">
          포인트 적립
        </Text>
        <Flex w="100%" gap="8px" align="center">
          <PlusCircle w="16px" h="16px" />
          <Text fontSize="14px" fontWeight="400">
            {isKid ? '보호자' : '아이'} 1명과 연동한 경우{' '}
            <Text as="span" fontWeight="700">
              20P
            </Text>
          </Text>
        </Flex>
        <Flex w="100%" gap="8px" align="center">
          <PlusCircle w="16px" h="16px" />
          <Text fontSize="14px" fontWeight="400">
            도장판 1개 {isKid ? '받기' : '생성'}{' '}
            <Text as="span" fontWeight="700">
              {isKid ? '10P' : '5P'}
            </Text>
          </Text>
        </Flex>
        <Flex w="100%" gap="8px" align="center">
          <PlusCircle w="16px" h="16px" />
          <Text fontSize="14px" fontWeight="400">
            {isKid ? '선물 쿠폰 받은 경우' : '도장판 1개 찍어주기'}{' '}
            <Text as="span" fontWeight="700">
              {isKid ? '30P' : '10P'}
            </Text>
          </Text>
        </Flex>
        <Flex w="100%" gap="8px" align="center">
          <PlusCircle w="16px" h="16px" />
          <Text fontSize="14px" fontWeight="400">
            {isKid
              ? '‘선물 받기 완료’ 버튼을 눌러준 경우'
              : '쿠폰에 대한 선물을 완료한 경우'}{' '}
            <Text as="span" fontWeight="700">
              {isKid ? '10P' : '30P'}
            </Text>
          </Text>
        </Flex>
        <Flex w="100%" gap="8px" align="center">
          <PlusCircle w="16px" h="16px" />
          <Text fontSize="14px" fontWeight="400">
            회원가입{' '}
            <Text as="span" fontWeight="700">
              {isKid ? '90P' : '50P'}
            </Text>
          </Text>
        </Flex>
      </VStack>
      {!isKid && (
        <VStack
          w="100%"
          p="16px"
          align="flex-start"
          spacing="16px"
          bg="white"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="8px"
        >
          <Text layerStyle="subtitle16Sbd" color="#000">
            포인트 차감
          </Text>
          <Flex w="100%" gap="8px" align="center">
            <MinusCircle w="16px" h="16px" />
            <Text fontSize="14px" fontWeight="400">
              도장판을 삭제한 경우{' '}
              <Text as="span" fontWeight="700">
                -20P
              </Text>
            </Text>
          </Flex>
          <Flex w="100%" gap="8px" align="center">
            <MinusCircle w="16px" h="16px" />
            <Text fontSize="14px" fontWeight="400">
              선물 약속 날짜 안에 선물을 지급하지 않은 경우{' '}
              <Text as="span" fontWeight="700">
                -100P
              </Text>
            </Text>
          </Flex>
        </VStack>
      )}
    </VStack>
  );
};

export default Rules;
