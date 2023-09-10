import { Box, Circle, Flex, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { inquireRanking } from '@/apis/ranking';
import { Clock, DownTriangle, UpTriangle } from '@/public/icon';

const Ranking = () => {
  const { query } = useRouter();
  const memberType = query.memberType as string;
  const isGuardianpage = memberType === 'guardians';
  const { data: ranking } = useQuery(
    ['ranking', memberType],
    () => inquireRanking(memberType),
    {
      enabled: !!memberType,
    }
  );

  const rankingStatus = {
    UP: <UpTriangle w="9px" h="9px" />,
    DOWN: <DownTriangle w="9px" h="9px" />,
    HOLD: (
      <Box w="8px" h="2px" bg="gray.500" flexShrink="0" borderRadius="1px" />
    ),
  };

  return (
    <VStack w="100%" spacing="0" pos="relative">
      <VStack
        w="100%"
        h="180px"
        justify="center"
        bgColor="polzzak.default"
        bgImage="url('/popper.png')"
        bgRepeat="no-repeat"
        bgPosition="center"
        spacing="8px"
      >
        <Text layerStyle="title22Bd" color="white">
          폴짝! 랭킹
        </Text>
        <Flex gap="8px" align="center">
          <Box
            p="4px 6px"
            bg="blue.100"
            layerStyle="caption12Sbd"
            color="polzzak.default"
            borderRadius="4px"
          >
            {isGuardianpage ? '보호자' : '아이'} 회원
          </Box>
          <Text layerStyle="subtitle18Sbd" color="white">
            TOP 30
          </Text>
        </Flex>
        <Flex gap="5px" align="center">
          <Clock w="10px" h="10px" />
          <Text layerStyle="caption12Md" color="blue.200">
            7월 1일 20:00 기준
          </Text>
        </Flex>
      </VStack>
      <VStack w="100%" p="16px 8px" bg="white" pos="sticky" top="0" zIndex="1">
        <Flex
          w="100%"
          p="16px"
          justify="space-between"
          align="center"
          borderRadius="8px"
          bg="blue.150"
        >
          <Flex gap="8px" align="center">
            <Text
              w="24px"
              textAlign="center"
              layerStyle="body14Sbd"
              color="gray.800"
              pr="3px"
            >
              56
            </Text>
            <Circle size="40px" bg="gray.100" />
            <VStack spacing="3.5px" align="flex-start">
              {isGuardianpage && (
                <Box
                  p="3px 6px"
                  bg="gray.200"
                  border="1px solid rgba(0, 0, 0, 0.12)"
                  borderRadius="8px"
                  layerStyle="caption12Md"
                  color="gray.700"
                >
                  엄마 회원
                </Box>
              )}
              <Flex gap="8px" align="center">
                <Text layerStyle="caption13Sbd" color="gray.700">
                  해린이네두목
                </Text>
                <Circle
                  size="21px"
                  bg="polzzak.default"
                  layerStyle="caption12Md"
                  color="white"
                >
                  나
                </Circle>
              </Flex>
            </VStack>
          </Flex>
          <VStack
            w="64px"
            p="4px 0"
            borderRadius="8px"
            bg="blue.100"
            spacing="2px"
          >
            <Text fontSize="10px" fontWeight="500" color="blue.400">
              20,230P
            </Text>
            <Text layerStyle="caption12Sbd" color="polzzak.default">
              20 계단
            </Text>
          </VStack>
        </Flex>
      </VStack>
      <VStack w="100%" p="16px" spacing="16px">
        <Text w="100%" layerStyle="subtitle18Sbd">
          TOP 30
        </Text>
        <VStack w="100%" spacing="32px">
          {ranking?.data?.rankingSummaries.map((rank) => (
            <Flex
              w="100%"
              justify="space-between"
              align="center"
              borderRadius="8px"
            >
              <Flex gap="8px" align="center">
                <VStack
                  w="24px"
                  spacing={rank.rankingStatus === 'HOLD' ? '4px' : '0'}
                  justify="center"
                  pr="3px"
                >
                  <Text
                    textAlign="center"
                    layerStyle="body14Sbd"
                    color="gray.800"
                  >
                    {rank.ranking}
                  </Text>
                  {rankingStatus[rank.rankingStatus]}
                </VStack>
                <Circle
                  size="40px"
                  bgImg={rank.profileUrl}
                  bgSize="cover"
                  bgRepeat="no-repeat"
                />
                <VStack spacing="3.5px" align="flex-start">
                  {isGuardianpage && (
                    <Box
                      p="3px 6px"
                      bg="gray.200"
                      border="1px solid rgba(0, 0, 0, 0.12)"
                      borderRadius="8px"
                      layerStyle="caption12Md"
                      color="gray.700"
                    >
                      {rank.memberTypeDetail} 회원
                    </Box>
                  )}
                  <Text layerStyle="caption13Sbd" color="gray.700">
                    {rank.nickname}
                  </Text>
                </VStack>
              </Flex>
              <VStack
                w="64px"
                p="4px 0"
                borderRadius="8px"
                bg="blue.100"
                spacing="2px"
              >
                <Text fontSize="10px" fontWeight="500" color="blue.400">
                  {rank.point}P
                </Text>
                <Text layerStyle="caption12Sbd" color="polzzak.default">
                  {rank.level} 계단
                </Text>
              </VStack>
            </Flex>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Ranking;
