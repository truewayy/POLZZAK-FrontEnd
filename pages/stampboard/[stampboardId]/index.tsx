import { Box, Button, Circle, Flex, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';

import { stampboardDetail } from '@/apis/stamp';
import StampBoard from '@/components/Stamp/StampBoard';
import { Coupon, EditFilledIcon, LeftArrow } from '@/public/icon';

interface StampboardProps {
  stampboardId: string;
}

const Stampboard = ({ stampboardId }: StampboardProps) => {
  const { data } = useQuery(['stampboard', stampboardId], () =>
    stampboardDetail(stampboardId as string)
  );
  const stampboard = data?.data;

  const createdDate = new Date(stampboard?.createdDate || '');
  const currentDate = new Date();
  const diffDate = Math.ceil(
    (currentDate.getTime() - createdDate.getTime()) / (1000 * 3600 * 24)
  );

  console.log(stampboard);
  return (
    <VStack w="100%" h="100%">
      <VStack w="100%" p="20px 5%" bg="#F8F8FC">
        <Flex pb="10px" w="100%" justify="space-between" align="center">
          <LeftArrow w="24px" h="24px" fill="gray.700" />
          <EditFilledIcon w="24px" h="24px" />
        </Flex>
        <Flex w="100%" pb="10px" justify="space-between" align="center">
          <Text layerStyle="title1" color="rgba(46, 48, 56, 1)">
            {stampboard?.name}
          </Text>
          <Box
            bg="#59B9FF"
            borderRadius="6px"
            color="white"
            p="4px 8px"
            layerStyle="subtitle3"
          >
            D+{diffDate}
          </Box>
        </Flex>
        <StampBoard count={stampboard?.goalStampCount || 10} />
      </VStack>
      <VStack w="100%" p="20px 5%" bg="#fff" spacing="23px">
        <Flex w="100%" justify="space-between" align="center">
          <Text layerStyle="subtitle3" color="rgba(46, 48, 56, 1)">
            미션 목록
          </Text>
        </Flex>
        <VStack w="100%" spacing="18px">
          {stampboard?.missions.map(({ id, content }) => (
            <Text w="100%" key={id} layerStyle="body3" color="#2E3038">
              {content}
            </Text>
          ))}
        </VStack>
      </VStack>
      <Box w="100%" h="8px" bg="#F8F8FC" />
      <VStack w="100%" p="20px 5%" bg="#fff" spacing="16px">
        <Flex w="100%" justify="space-between" align="center">
          <Text layerStyle="subtitle3" color="rgba(46, 48, 56, 1)">
            보상
          </Text>
        </Flex>
        <VStack pb="10px" w="100%" spacing="16px">
          <Circle size="80px" bg="#C7E5FF">
            <Coupon w="48px" h="48px" />
          </Circle>
          <Text layerStyle="subtitle1" color="#2E3038">
            {stampboard?.reward}
          </Text>
        </VStack>
        <VStack w="100%" spacing="14px" pb="30px">
          <Button w="100%" h="auto" p="14px 0" bg="polzzak.default" isDisabled>
            <Text layerStyle="subtitle3" color="white">
              쿠폰 발급하기
            </Text>
          </Button>
          <Text layerStyle="body4" color="gray.500">
            도장판을 다 채워서 쿠폰 발급이 가능해요!
          </Text>
        </VStack>
        <Text
          fontSize="13px"
          fontWeight="600"
          textDecor="underline"
          color="gray.500"
        >
          도장판 삭제하기
        </Text>
      </VStack>
    </VStack>
  );
};

export default Stampboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { stampboardId } = context.query;
  return {
    props: {
      stampboardId,
    },
  };
};
