import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';

import SearchInputView from '@/components/Link/SearchInput/SearchInputView';
import {
  BackIcon,
  BasicProfileIcon,
  ClipIcon,
  MailIcon,
  XIcon,
} from '@/public/icon';

const Link = () => (
  <VStack w="100%" minH="100vh" bg="white">
    <VStack w="100%" align="flex-start" bg="white" p="0 5% 26px 5%">
      <Flex w="100%" p="10px 0" pos="fixed" bg="white">
        <BackIcon w="24px" h="24px" />
      </Flex>
      <Flex w="100%" p="45px 0 10px 0">
        <Text layerStyle="title1">연동 관리</Text>
      </Flex>
      <Flex w="100%" p="14px 0 24px 0">
        <SearchInputView />
      </Flex>
      <Flex w="100%" p="14px 0 16px 0" gap="6px" align="center">
        <MailIcon w="14px" h="14px" />
        <Text layerStyle="subtitle2" color="gray.500">
          요청 목록
        </Text>
      </Flex>
      <VStack w="100%" spacing="30px">
        <VStack w="100%" spacing="10px" align="center">
          <Text layerStyle="body2" color="gray.500" alignSelf="flex-start">
            나에게 온 연동 요청
          </Text>
          <Flex w="100%" justify="space-between">
            <Flex gap="10px" align="center">
              <BasicProfileIcon w="32px" h="32px" />
              <Text layerStyle="body2">나는고양이</Text>
            </Flex>
            <Flex gap="10px">
              <Button
                variant="unstyled"
                fontSize="14px"
                fontWeight="600"
                color="white"
                bg="blue.500"
                h="28px"
                p="0 16px"
              >
                수락
              </Button>
              <Button
                variant="unstyled"
                fontSize="14px"
                fontWeight="600"
                color="white"
                bg="error.500"
                h="28px"
                p="0 16px"
              >
                거절
              </Button>
            </Flex>
          </Flex>
        </VStack>
        <VStack w="100%" spacing="10px" align="center">
          <Text layerStyle="body2" color="gray.500" alignSelf="flex-start">
            내가 보낸 연동 요청
          </Text>
          <Flex w="100%" justify="space-between">
            <Flex gap="10px" align="center">
              <BasicProfileIcon w="32px" h="32px" />
              <Text layerStyle="body2">칵테일새우</Text>
            </Flex>
            <Button
              variant="unstyled"
              fontSize="14px"
              fontWeight="600"
              color="white"
              bg="error.500"
              h="28px"
              p="0 16px"
            >
              요청 취소
            </Button>
          </Flex>
        </VStack>
      </VStack>
    </VStack>
    <Box w="100%" h="8px" bg="gray.100" />
    <VStack
      w="100%"
      p="26px 5% 30px 5%"
      bg="white"
      align="flex-start"
      spacing="16px"
    >
      <Flex w="100%" gap="6px" align="center">
        <ClipIcon w="14px" h="14px" />
        <Text layerStyle="subtitle2" color="gray.500">
          나와 연동된 아이 4
        </Text>
      </Flex>
      <VStack w="100%" spacing="20px">
        <Flex w="100%" justify="space-between">
          <Flex gap="10px" align="center">
            <BasicProfileIcon w="32px" h="32px" />
            <Text layerStyle="body2">칵테일새우</Text>
          </Flex>
          <XIcon w="24px" h="24px" />
        </Flex>
        <Flex w="100%" justify="space-between">
          <Flex gap="10px" align="center">
            <BasicProfileIcon w="32px" h="32px" />
            <Text layerStyle="body2">칵테일새우</Text>
          </Flex>
          <XIcon w="24px" h="24px" />
        </Flex>
        <Flex w="100%" justify="space-between">
          <Flex gap="10px" align="center">
            <BasicProfileIcon w="32px" h="32px" />
            <Text layerStyle="body2">칵테일새우</Text>
          </Flex>
          <XIcon w="24px" h="24px" />
        </Flex>
      </VStack>
    </VStack>
  </VStack>
);

export default Link;
