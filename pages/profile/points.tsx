import { Box, Circle, Flex, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import { pointLog } from '@/apis/point';
import { PointPlus } from '@/public/icon';
import { formatDateDifference } from '@/utils/dateConvert';

const Points = () => {
  const [startId, setStartId] = useState<number>();
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
    <VStack w="100%" p="16px" minH="100vh" bg="gray.100">
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
              <Circle size="40px" bgColor="blue.200">
                <PointPlus w="25px" h="20px" />
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
                  {item.increasedPoint}P 적립
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
