import { Button, Circle, Flex, Text, VStack } from '@chakra-ui/react';

const LinkRequestNotification = () => (
  <VStack
    w="100%"
    p="16px"
    bg="white"
    border="1px solid"
    borderColor="gray.200"
    borderRadius="8px"
    spacing="16px"
  >
    <VStack w="100%" spacing="8px" align="flex-start">
      <Flex w="100%" gap="7px" justify="flex-start" align="center">
        <Text layerStyle="subtitle16Bd">
          <Text as="span" mr="4px">
            💌
          </Text>
          연동 요청
        </Text>
        <Circle size="4px" bg="gray.300" />
        <Text layerStyle="caption12Md" color="gray.500">
          방금 전
        </Text>
      </Flex>
      <Text layerStyle="body14Md">
        <Text as="span" layerStyle="body14Sbd">
          죽음의 ASMR
        </Text>
        님이 회원님께 연동 요청을 보냈어요
      </Text>
    </VStack>
    <Flex w="100%" gap="10px">
      <Button w="100%" p="8px 20px" bg="polzzak.default" borderRadius="8px">
        <Text layerStyle="body16Md" color="white">
          수락
        </Text>
      </Button>
      <Button w="100%" p="8px 20px" bg="error.500" borderRadius="8px">
        <Text layerStyle="body16Md" color="white">
          거절
        </Text>
      </Button>
    </Flex>
    <Flex w="100%" gap="4px" justify="flex-start" align="center">
      <Circle size="24px" bg="gray.300" />
      <Text layerStyle="caption12Md" color="gray.500">
        죽음의 ASMR
      </Text>
    </Flex>
  </VStack>
);

export default LinkRequestNotification;
