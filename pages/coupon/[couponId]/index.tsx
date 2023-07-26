import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

import { Dash, LeftArrow, Picture } from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';

const Coupon = () => {
  const { memberType } = useRecoilValue(userInfoAtom);
  const isKid = memberType.name === 'KID';

  return (
    <VStack bg="polzzak.default" minH="100vh" spacing="30px">
      <Flex w="100%" p="10px 16px" justify="space-between">
        <LeftArrow w="24px" h="24px" fill="white" />
        <Picture w="30px" h="30px" />
      </Flex>
      <VStack w="100%" spacing="0px" p="0 5%">
        <VStack
          w="100%"
          p="26px"
          spacing="10px"
          bg="white"
          borderRadius="12px"
          pos="relative"
          overflow="hidden"
        >
          <Box w="100%" h="6px" pos="absolute" bg="blue.200" top="0" />
          <Text layerStyle="subtitle16Sbd" color="blue.600">
            Reward
          </Text>
          <Text layerStyle="subtitle20Sbd">아이유, 2023 콘서트 티켓</Text>
          <Dash w="95%" h="16px" pos="absolute" bottom="-8px" zIndex="1" />
        </VStack>
        <VStack
          w="100%"
          p="24px 26px"
          spacing="24px"
          bg="white"
          borderRadius="12px"
          pos="relative"
        >
          <VStack w="100%" spacing="21px">
            <Flex w="100%" gap="14px" align="center">
              <Circle size="44px" bg="gray.200" />
              <VStack spacing="2px" align="flex-start">
                <Text layerStyle="body13Md" color="gray.500">
                  받는 사람
                </Text>
                <Text layerStyle="subtitle16Sbd" color="gray.800">
                  해린해린해린해린해린
                </Text>
              </VStack>
            </Flex>
            <Flex w="100%" gap="14px" align="center">
              <Circle size="44px" bg="gray.200" />
              <VStack spacing="2px" align="flex-start">
                <Text layerStyle="body13Md" color="gray.500">
                  받는 사람
                </Text>
                <Text layerStyle="subtitle16Sbd" color="gray.800">
                  해린해린해린해린해린
                </Text>
              </VStack>
            </Flex>
          </VStack>
          <VStack w="100%" spacing="20px">
            <Box h="1.5px" w="100%" bg="gray.200" />
            <Grid w="100%" templateColumns="repeat(3, 1fr)">
              <VStack spacing="2px">
                <Text layerStyle="body13Md" color="gray.500">
                  완료 미션
                </Text>
                <Text layerStyle="subtitle18Sbd" color="blue.600">
                  8{' '}
                  <Text as="span" layerStyle="caption12Sbd" color="blue.600">
                    개
                  </Text>
                </Text>
              </VStack>
              <VStack spacing="2px">
                <Text layerStyle="body13Md" color="gray.500">
                  모은 도장
                </Text>
                <Text layerStyle="subtitle18Sbd" color="blue.600">
                  8{' '}
                  <Text as="span" layerStyle="caption12Sbd" color="blue.600">
                    개
                  </Text>
                </Text>
              </VStack>
              <VStack spacing="2px">
                <Text layerStyle="body13Md" color="gray.500">
                  걸린 기간
                </Text>
                <Text layerStyle="subtitle18Sbd" color="blue.600">
                  8{' '}
                  <Text as="span" layerStyle="caption12Sbd" color="blue.600">
                    개
                  </Text>
                </Text>
              </VStack>
            </Grid>
          </VStack>
          <Dash w="95%" h="16px" pos="absolute" bottom="-8px" zIndex="1" />
        </VStack>
        <Flex
          w="100%"
          p="24px 36px"
          bg="white"
          borderRadius="12px"
          gap="30px"
          justify="center"
          pos="relative"
          overflow="hidden"
        >
          <VStack spacing="2px" align="flex-start">
            <Text layerStyle="body13Md" color="gray.500">
              미션 시작일
            </Text>
            <Text layerStyle="subtitle18Sbd" color="gray.800">
              2023. 02. 12
            </Text>
          </VStack>
          <VStack spacing="2px" align="flex-start">
            <Text layerStyle="body13Md" color="gray.500">
              미션 시작일
            </Text>
            <Text layerStyle="subtitle18Sbd" color="gray.800">
              2023. 02. 12
            </Text>
          </VStack>
          <Box w="100%" h="6px" pos="absolute" bg="blue.200" bottom="0" />
        </Flex>
      </VStack>
      <Text layerStyle="body14Sbd" textAlign="center" color="gray.700">
        <Text color="#fff" as="span">
          2023. 04. 12
        </Text>{' '}
        까지 <br />
        선물을 전달하기로 약속했어요!
      </Text>
      {isKid && (
        <Flex w="100%" gap="7px" p="0 5%">
          <Button
            w="100%"
            h="auto"
            p="14px"
            bg="blue.600"
            layerStyle="subtitle16Sbd"
            color="white"
          >
            선물 조르기
          </Button>
          <Button
            w="100%"
            h="auto"
            p="14px"
            bg="white"
            layerStyle="subtitle16Sbd"
            color="blue.600"
          >
            선물 받기 완료
          </Button>
        </Flex>
      )}
    </VStack>
  );
};

export default Coupon;
