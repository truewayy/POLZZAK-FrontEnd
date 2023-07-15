import { Flex, Image, Text, VStack } from '@chakra-ui/react';

import SEO from '@/components/Common/SEO';
import LoginButton from '@/components/Login/Button/Button';

export default function Home() {
  return (
    <VStack
      m="auto 0"
      p="0 5%"
      h="100vh"
      justify="center"
      spacing="110px"
      bg="gray.100"
    >
      <SEO title="폴짝!" />
      <VStack w="100%" spacing="26px">
        <Image src="/helloeveryone.png" w="200px" h="200px" />
        <VStack w="100%" spacing="16px">
          <Text layerStyle="title22Bd">참 잘 했어요 도장 쾅!</Text>
          <Text layerStyle="body16Md" textAlign="center" color="gray.600">
            미션을 수행하고 칭찬 도장을 모으며
            <br />
            <Text as="span" color="blue.600">
              폴짝
            </Text>{' '}
            성장해요
          </Text>
        </VStack>
      </VStack>

      <VStack w="100%" spacing="18px">
        <Text layerStyle="body15Md" color="gray.700">
          다음 소셜 계정으로 시작하기
        </Text>
        <Flex justifyContent="space-between" gap="23px">
          <LoginButton type="kakao" />
          <LoginButton type="google" />
        </Flex>
      </VStack>
    </VStack>
  );
}
