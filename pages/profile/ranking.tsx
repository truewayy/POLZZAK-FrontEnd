import { Box, Circle, Flex, Text, VStack } from '@chakra-ui/react';

import { Clock } from '@/public/icon';

const Ranking = () => (
  <VStack w="100%" spacing="0">
    <VStack
      w="100%"
      h="180px"
      justify="center"
      bgColor="polzzak.default"
      bgImage="url('/popper.png')"
      bgRepeat="no-repeat"
      bgPosition="center"
      spacing="8px"
    >
      <Text layerStyle="title22Bd" color="white">
        폴짝! 랭킹
      </Text>
      <Flex gap="8px" align="center">
        <Box
          p="4px 6px"
          bg="blue.100"
          layerStyle="caption12Sbd"
          color="polzzak.default"
          borderRadius="4px"
        >
          보호자 회원
        </Box>
        <Text layerStyle="subtitle18Sbd" color="white">
          TOP 30
        </Text>
      </Flex>
      <Flex gap="5px" align="center">
        <Clock w="10px" h="10px" />
        <Text layerStyle="caption12Md" color="blue.200">
          7월 1일 20:00 기준
        </Text>
      </Flex>
    </VStack>
    <VStack w="100%" p="16px 8px">
      <Flex
        w="100%"
        p="16px"
        justify="space-between"
        align="center"
        borderRadius="8px"
        bg="blue.150"
      >
        <Flex gap="8px" align="center">
          <Text
            w="24px"
            textAlign="center"
            layerStyle="body14Sbd"
            color="gray.800"
            pr="3px"
          >
            56
          </Text>
          <Circle size="40px" bg="gray.100" />
          <VStack spacing="3.5px" align="flex-start">
            <Box
              p="3px 6px"
              bg="gray.200"
              border="1px solid rgba(0, 0, 0, 0.12)"
              borderRadius="8px"
              layerStyle="caption12Md"
              color="gray.700"
            >
              엄마 회원
            </Box>
            <Flex gap="8px" align="center">
              <Text layerStyle="caption13Sbd" color="gray.700">
                해린이네두목
              </Text>
              <Circle
                size="21px"
                bg="polzzak.default"
                layerStyle="caption12Md"
                color="white"
              >
                나
              </Circle>
            </Flex>
          </VStack>
        </Flex>
        <VStack
          w="64px"
          p="4px 0"
          borderRadius="8px"
          bg="blue.100"
          spacing="2px"
        >
          <Text fontSize="10px" fontWeight="500" color="blue.400">
            20,230P
          </Text>
          <Text layerStyle="caption12Sbd" color="polzzak.default">
            20 계단
          </Text>
        </VStack>
      </Flex>
    </VStack>
    <VStack w="100%" p="16px" spacing="16px">
      <Text w="100%" layerStyle="subtitle18Sbd">
        TOP 30
      </Text>
      <Flex w="100%" justify="space-between" align="center" borderRadius="8px">
        <Flex gap="8px" align="center">
          <VStack w="24px" spacing="4px" justify="center" pr="3px">
            <Text textAlign="center" layerStyle="body14Sbd" color="gray.800">
              1
            </Text>
            <Box
              w="8px"
              h="2px"
              bg="gray.500"
              flexShrink="0"
              borderRadius="1px"
            />
          </VStack>
          <Circle size="40px" bg="gray.100" />
          <VStack spacing="3.5px" align="flex-start">
            <Box
              p="3px 6px"
              bg="gray.200"
              border="1px solid rgba(0, 0, 0, 0.12)"
              borderRadius="8px"
              layerStyle="caption12Md"
              color="gray.700"
            >
              엄마 회원
            </Box>
            <Flex gap="8px" align="center">
              <Text layerStyle="caption13Sbd" color="gray.700">
                해린이네두목
              </Text>
              <Circle
                size="21px"
                bg="polzzak.default"
                layerStyle="caption12Md"
                color="white"
              >
                나
              </Circle>
            </Flex>
          </VStack>
        </Flex>
        <VStack
          w="64px"
          p="4px 0"
          borderRadius="8px"
          bg="blue.100"
          spacing="2px"
        >
          <Text fontSize="10px" fontWeight="500" color="blue.400">
            20,230P
          </Text>
          <Text layerStyle="caption12Sbd" color="polzzak.default">
            20 계단
          </Text>
        </VStack>
      </Flex>
    </VStack>
  </VStack>
);

export default Ranking;
