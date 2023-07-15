import { Circle, Flex, Text, VStack } from '@chakra-ui/react';

const NewStampboardNotification = () => (
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
            🥁️️
          </Text>
          새로운 도장판 도착
        </Text>
        <Circle size="4px" bg="gray.300" />
        <Text layerStyle="caption12Md" color="gray.500">
          05.03
        </Text>
      </Flex>
      <Text layerStyle="body14Md" wordBreak="keep-all">
        <Text as="span" layerStyle="body14Sbd">
          ‘지각 안하기 프로젝트’{' '}
        </Text>
        도장판이 만들어졌어요. 미션 수행 시~작!
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

export default NewStampboardNotification;
