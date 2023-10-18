import { Box, Circle, Flex, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { myPoint } from '@/apis/point';
import { userInfo } from '@/apis/user';
import ROUTES from '@/constants/routes';
import { Medal, Point, Rule, StepPudding } from '@/public/icon';

const MyPoint = () => {
  const { data: user } = useQuery(['userInfo'], userInfo);
  const memberType = user?.data?.memberType;

  const { push } = useRouter();
  const { data: my } = useQuery(['myPoint'], myPoint);

  const handleClickRanking = () => {
    push({
      pathname: ROUTES.PROFILE.RANKING,
      query: { memberType: memberType?.name === 'KID' ? 'kids' : 'guardians' },
    });
  };

  const handleClickPointLog = () => {
    push(ROUTES.PROFILE.POINTS);
  };

  const handleClickRules = () => {
    push(ROUTES.PROFILE.RULES);
  };

  return (
    <VStack w="100%" h="100%" p="16px 5% 20px 5%" bg="gray.100" spacing="16px">
      <VStack w="100%" p="20px" borderRadius="12px" bg="white" spacing="20px">
        <Text w="100%" layerStyle="subtitle16Sbd" color="gray.800">
          다음 계단까지
          <br />
          <Text as="span" layerStyle="title22Bd" color="polzzak.default">
            {100 - (Number(my?.point) % 100)}P{' '}
          </Text>
          남았어요!
        </Text>
        <Flex w="100%" pt="70px" align="flex-end" justify="center" gap="30px">
          <Flex
            w="60px"
            h="40px"
            pt="15px"
            bg="gray.200"
            pos="relative"
            justify="center"
            align="flex-start"
            layerStyle="subtitle16Sbd"
            color="gray.500"
          >
            <Box
              w="60px"
              h="24px"
              borderRadius="50%"
              bg="#E0E0EC"
              pos="absolute"
              top="-10px"
            />
            {my?.level === 0 ? null : Number(my?.level) - 1}
          </Flex>
          <Flex
            w="60px"
            h="60px"
            pt="15px"
            bg="blue.150"
            pos="relative"
            justify="center"
            align="flex-start"
            layerStyle="subtitle16Sbd"
            color="blue.600"
          >
            <StepPudding
              w="93px"
              h="106px"
              pos="absolute"
              top="-100px"
              left="-16px"
              zIndex="1"
            />
            <Box
              w="60px"
              h="24px"
              borderRadius="50%"
              bg="blue.200"
              pos="absolute"
              top="-10px"
            />
            {my?.level}
          </Flex>
          <Flex
            w="60px"
            h="80px"
            pt="15px"
            bg="gray.200"
            pos="relative"
            justify="center"
            align="flex-start"
            layerStyle="subtitle16Sbd"
            color="gray.500"
          >
            <Box
              w="60px"
              h="24px"
              borderRadius="50%"
              bg="#E0E0EC"
              pos="absolute"
              top="-10px"
            />
            {Number(my?.level) + 1}
          </Flex>
        </Flex>
        <Flex align="center" gap="6px">
          <Text layerStyle="body14Md" color="gray.800">
            보유포인트
          </Text>
          <Text layerStyle="body14Sbd" color="blue.600">
            {my?.point}P
          </Text>
        </Flex>
      </VStack>
      <Flex w="100%" gap="12px">
        <VStack
          w="100%"
          p="16px 0 14px 0"
          spacing="10px"
          bg="white"
          borderRadius="8px"
          cursor="pointer"
          onClick={handleClickRanking}
        >
          <Circle size="50px" bg="blue.150">
            <Medal w="23px" h="31px" />
          </Circle>
          <Text layerStyle="body14Md">폴짝 랭킹</Text>
        </VStack>
        <VStack
          w="100%"
          p="16px 0 14px 0"
          spacing="10px"
          bg="white"
          borderRadius="8px"
          cursor="pointer"
          onClick={handleClickPointLog}
        >
          <Circle size="50px" bg="blue.150">
            <Point w="30px" h="30px" />
          </Circle>
          <Text layerStyle="body14Md">적립 내역</Text>
        </VStack>
        <VStack
          w="100%"
          p="16px 0 14px 0"
          spacing="10px"
          bg="white"
          borderRadius="8px"
          cursor="pointer"
          onClick={handleClickRules}
        >
          <Circle size="50px" bg="blue.150">
            <Rule w="22px" h="29px" />
          </Circle>
          <Text layerStyle="body14Md">포인트 규칙</Text>
        </VStack>
      </Flex>
    </VStack>
  );
};
export default MyPoint;
