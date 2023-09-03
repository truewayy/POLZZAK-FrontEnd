import { Box, Circle, Flex, Text, VStack } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

import { ClipIcon, Setting } from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';

const BasicInfo = () => {
  const { memberType, nickname, profileUrl, families } =
    useRecoilValue(userInfoAtom);

  const isKid = memberType.name === 'KID';
  const linkedFamily = families.length;

  return (
    <VStack w="100%" spacing="0px">
      <Flex w="100%" h="44px" p="0 5%" align="center" justify="flex-end">
        <Setting w="24px" h="24px" />
      </Flex>
      <Flex
        w="100%"
        p="0 5% 20px 5%"
        align="center"
        justify="flex-start"
        gap="12px"
      >
        <Circle
          size="70px"
          bg={`url(${profileUrl})`}
          bgSize="cover"
          bgPos="center"
        />
        <VStack spacing="8px" align="flex-start">
          <Flex gap="6px" align="center">
            {!isKid && (
              <Box
                p="4px 10px"
                bg="gray.200"
                border="1px solid rgba(0, 0, 0, 0.12)"
                borderRadius="8px"
                layerStyle="body14Sbd"
                color="gray.700"
              >
                {memberType.detail}
              </Box>
            )}
            <Text layerStyle="subtitle16Sbd" color="gray.800">
              {nickname}
            </Text>
          </Flex>
          <Flex gap="6px" align="center">
            <ClipIcon w="14px" h="14px" />
            <Text layerStyle="body13Md" color="gray.600">
              연동된 {isKid ? '보호자' : '아이'}{' '}
              <Text
                as="span"
                layerStyle="body13Md"
                fontWeight="600"
                textDecor="underline"
                color="polzzak.default"
                cursor="pointer"
              >
                {linkedFamily}명
              </Text>
            </Text>
          </Flex>
        </VStack>
      </Flex>
    </VStack>
  );
};

export default BasicInfo;
