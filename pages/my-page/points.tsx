import { Box, Circle, Flex, Grid, Icon, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import { pointLog } from '@/apis/point';
import { LeftArrow, PointMinus, PointPlus } from '@/public/icon';
import { formatDateDifference } from '@/utils/dateConvert';

const Points = () => {
  const [startId, setStartId] = useState<number>();
  const { back } = useRouter();
  const { ref, inView } = useInView();
  const { data: points, fetchNextPage } = useInfiniteQuery(
    ['points'],
    ({ pageParam = 0 }) => pointLog(10, pageParam, startId),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.response.content.length === 10)
          return {
            pageParam: lastPage.nextPage,
          };
        return undefined;
      },
      cacheTime: 0,
      staleTime: 0,
    }
  );

  useEffect(() => {
    if (points)
      setStartId(points?.pages[points.pages.length - 1]?.response.startId);
  }, [points]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <VStack w="100%" p="16px" pt="50px" minH="100vh" bg="gray.100">
      <Grid
        w="100%"
        maxW="560px"
        templateColumns="repeat(3, 1fr)"
        placeItems="center"
        p="10px 16px"
        bg="white"
        pos="fixed"
        top="0"
        zIndex="3"
      >
        <LeftArrow w="10px" h="18px" mr="auto" onClick={back} />
        <Text layerStyle="subtitle18Sbd" color="#1C1C1C">
          포인트 적립내역
        </Text>
      </Grid>
      <VStack w="100%" spacing="8px">
        {points?.pages.map((point) =>
          point?.response.content.map((item) => (
            <Flex
              key={item.createdDate}
              w="100%"
              p="16px"
              pb="36px"
              justify="flex-start"
              gap="16px"
              align="flex-start"
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="8px"
              pos="relative"
            >
              <Circle
                size="40px"
                bgColor={item.increasedPoint > 0 ? 'blue.200' : 'error.200'}
              >
                <Icon
                  as={item.increasedPoint > 0 ? PointPlus : PointMinus}
                  w="25px"
                  h="20px"
                />
              </Circle>
              <VStack align="flex-start" spacing="8px">
                <Flex gap="7px" align="center">
                  <Text layerStyle="body14Sbd" color="gray.800">
                    {item.description}
                  </Text>
                  <Circle size="4px" bg="gray.300" />
                  <Text layerStyle="caption12Md" color="gray.500">
                    {formatDateDifference(item.createdDate)}
                  </Text>
                </Flex>
                <Text layerStyle="subtitle16Bd">
                  {Math.abs(item.increasedPoint)}P{' '}
                  {item.increasedPoint > 0 ? '적립' : '차감'}
                </Text>
              </VStack>
              <Text
                pos="absolute"
                right="16px"
                bottom="16px"
                layerStyle="body14Sbd"
                color="gray.500"
              >
                내 포인트 {item.remainingPoint}P
              </Text>
            </Flex>
          ))
        )}
        <Box ref={ref} />
      </VStack>
    </VStack>
  );
};

export default Points;
