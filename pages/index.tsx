import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';

import http from '@/apis/http';
import SEO from '@/components/Common/SEO';
import LoginButton from '@/components/Login/Button/Button';
import { MainCharactors } from '@/public/icon';

export default function Home() {
  return (
    <VStack m="auto 0" p="0 5%" gap={30}>
      <SEO title="폴짝!" />
      <Button onClick={() => http.get('/test')}>받아오기</Button>
      <HStack w="90%" justify="space-between" align="flex-start" pos="relative">
        <VStack
          justify="center"
          w={145}
          h={145}
          mt="20px"
          border="10px solid"
          borderColor="polzzak.default"
          borderRadius="100%"
        >
          <Text
            fontSize="42px"
            fontWeight="900"
            lineHeight="44px"
            color="polzzak.default"
          >
            반가
            <br />
            워요
          </Text>
        </VStack>
        <MainCharactors w={125} h={300} />
        <Box
          pos="absolute"
          w={200}
          h={4}
          right={7}
          bottom={-2}
          borderRadius="50%"
          zIndex={-1}
          bgColor="gray.300"
        />
      </HStack>

      <VStack w="100%">
        <Text layerStyle="head24B" color="gray.800" w="100%" textAlign="left">
          참 잘했어요 도장 쾅!
        </Text>
        <Text layerStyle="body1" color="gray.800" w="100%" textAlign="left">
          손가락 거는 걸로는 부족한 우리에게 필요했던
        </Text>
      </VStack>

      <VStack w="100%">
        <LoginButton type="kakao" />
        <LoginButton type="google" />
      </VStack>
    </VStack>
  );
}
