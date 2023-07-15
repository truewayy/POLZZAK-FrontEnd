import { Circle, Flex, Text, VStack } from '@chakra-ui/react';

const LinkAcceptNotification = () => (
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
            🤝🏻
          </Text>
          연동 완료
        </Text>
        <Circle size="4px" bg="gray.300" />
        <Text layerStyle="caption12Md" color="gray.500">
          1분 전
        </Text>
      </Flex>
      <Text layerStyle="body14Md" wordBreak="keep-all">
        <Text as="span" layerStyle="body14Sbd">
          죽음의 ASMR
        </Text>
        님과 연동이 완료되었어요! 도장판을 만들러 가볼까요? :)
      </Text>
    </VStack>
    <Flex w="100%" gap="4px" justify="flex-start" align="center">
      <Circle size="24px" bg="gray.300" />
      <Text layerStyle="caption12Md" color="gray.500">
        죽음의 ASMR
      </Text>
    </Flex>
  </VStack>
);

export default LinkAcceptNotification;
