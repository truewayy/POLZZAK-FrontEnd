import { Circle, Flex, Text, VStack } from '@chakra-ui/react';

interface LevelNotificationProps {
  type: 'up' | 'down';
}

const LevelNotification = ({ type }: LevelNotificationProps) => (
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
            {type === 'up' ? '🥳' : '🚨'}
          </Text>
          레벨 {type === 'up' ? 'UP' : 'DOWN'}
        </Text>
        <Circle size="4px" bg="gray.300" />
        <Text layerStyle="caption12Md" color="gray.500">
          1분 전
        </Text>
      </Flex>
      <Text layerStyle="body14Md" wordBreak="keep-all">
        {type === 'up' ? '폴짝' : '조심'}!{' '}
        <Text as="span" layerStyle="body14Sbd">
          4계단
        </Text>
        으로 레벨이 {type === 'up' ? '올라갔어요' : '내려왔어요'}!
      </Text>
    </VStack>
  </VStack>
);

export default LevelNotification;
