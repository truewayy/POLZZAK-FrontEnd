import { Grid, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { LeftArrow } from '@/public/icon';

const Notice = () => {
  const { back } = useRouter();

  return (
    <VStack w="100%" minH="100vh" justify="center" spacing="0px" bg="gray.100">
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
          공지사항
        </Text>
      </Grid>
      <VStack w="100%">
        <Text layerStyle="subtitle20Rg" color="gray.400">
          업데이트 된 소식이 없어요
        </Text>
      </VStack>
    </VStack>
  );
};

export default Notice;
