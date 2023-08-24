/* eslint-disable no-unsafe-optional-chaining */
import { Box, Circle, Flex, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { myPoint } from '@/apis/point';
import ROUTES from '@/constants/routes';
import { ClipIcon, Medal, Point, Rule, Setting } from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';

const Profile = () => {
  const { memberType, nickname, profileUrl, families } =
    useRecoilValue(userInfoAtom);
  const { push } = useRouter();

  const { data: my } = useQuery(['myPoint'], myPoint);

  const isKid = memberType.name === 'KID';

  const handleClickRanking = () => {
    push({
      pathname: ROUTES.PROFILE.RANKING,
      query: { memberType: 'guardians' },
    });
  };

  const handleClickPointLog = () => {
    push(ROUTES.PROFILE.POINTS);
  };

  return (
    <VStack w="100%" minH="100vh" pb="100px" spacing="0px">
      <VStack w="100%" spacing="0px">
        <Flex w="100%" h="44px" p="0 5%" align="center" justify="flex-end">
          <Setting w="24px" h="24px" />
        </Flex>
        <Flex
          w="100%"
          p="0 5% 20px 5%"
          align="center"
          justify="flex-start"
          gap="12px"
        >
          <Circle
            size="70px"
            bg={`url(${profileUrl})`}
            bgSize="cover"
            bgPos="center"
          />
          <VStack spacing="8px" align="flex-start">
            <Flex gap="6px" align="center">
              {!isKid && (
                <Box
                  p="4px 10px"
                  bg="gray.200"
                  border="1px solid rgba(0, 0, 0, 0.12)"
                  borderRadius="8px"
                  layerStyle="body14Sbd"
                  color="gray.700"
                >
                  {memberType.detail}
                </Box>
              )}
              <Text layerStyle="subtitle16Sbd" color="gray.800">
                {nickname}
              </Text>
            </Flex>
            <Flex gap="6px" align="center">
              <ClipIcon w="14px" h="14px" />
              <Text layerStyle="body13Md" color="gray.600">
                연동된 {isKid ? '보호자' : '아이'}{' '}
                <Text
                  as="span"
                  layerStyle="body13Md"
                  fontWeight="600"
                  textDecor="underline"
                  color="polzzak.default"
                  cursor="pointer"
                >
                  {families.length}명
                </Text>
              </Text>
            </Flex>
          </VStack>
        </Flex>
      </VStack>
      <VStack
        w="100%"
        h="100%"
        p="16px 5% 20px 5%"
        bg="gray.100"
        spacing="16px"
      >
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
              <Box
                bg="url('/stepPudding.png')"
                bgSize="contain"
                bgRepeat="no-repeat"
                bgPosition="center"
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
          >
            <Circle size="50px" bg="blue.150">
              <Rule w="22px" h="29px" />
            </Circle>
            <Text layerStyle="body14Md">포인트 규칙</Text>
          </VStack>
        </Flex>
      </VStack>
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
          <Text
            layerStyle="caption13Sbd"
            color="gray.400"
            textDecor="underline"
          >
            이용약관
          </Text>
          <Text
            layerStyle="caption13Sbd"
            color="gray.400"
            textDecor="underline"
          >
            개인정보처리방침
          </Text>
        </Flex>
      </VStack>
    </VStack>
  );
};

export default Profile;
