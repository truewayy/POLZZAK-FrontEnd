import { Circle, Flex, Text, VStack } from '@chakra-ui/react';

const CouponCreateNotification = () => (
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
            🎟️️
          </Text>
          쿠폰 발급 완료
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
        도장판에 선물 쿠폰이 도착했어요! 쿠폰을 받으러 가볼까요?
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

export default CouponCreateNotification;
