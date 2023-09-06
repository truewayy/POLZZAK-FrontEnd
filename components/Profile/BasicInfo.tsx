import {
  Box,
  Circle,
  Flex,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Sheet from 'react-modal-sheet';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { familiesInfo } from '@/apis/family';
import { ClipIcon, Setting } from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';

const BasicInfo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { memberType, nickname, profileUrl } = useRecoilValue(userInfoAtom);
  const { data } = useQuery(['families'], familiesInfo);
  const families = data?.data?.families;

  const isKid = memberType.name === 'KID';
  const linkedFamily = families?.length;

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
                onClick={onOpen}
              >
                {linkedFamily}명
              </Text>
            </Text>
          </Flex>
        </VStack>
      </Flex>
      <Sheet
        isOpen={isOpen}
        onClose={onClose}
        snapPoints={[500, 320, 200, 0]}
        initialSnap={0}
        style={{
          maxWidth: '560px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <VStack w="100%" h={500} bg="white" p="20px" spacing="24px">
              <VStack
                w="100%"
                p="20px"
                pt="0"
                spacing="6px"
                pos="sticky"
                top="0"
                bg="white"
              >
                <Text layerStyle="subtitle16Sbd">
                  나와 연동된 {isKid ? '보호자' : '아이'}
                </Text>
                <Text layerStyle="body13Md">
                  <Text as="span" layerStyle="body13Md" color="polzzak.default">
                    메인홈 {'>'} 연동관리
                  </Text>
                  에서 연동정보 수정이 가능해요
                </Text>
              </VStack>
              <VStack w="100%" spacing="8px">
                {families?.map((family) => (
                  <Flex w="100%" p="12px 16px" align="center" gap="16px">
                    <Circle
                      size="60px"
                      bg={`url(${family.profileUrl})`}
                      bgSize="cover"
                      bgPos="center"
                    />
                    <Text layerStyle="body14Md">{family.nickname}</Text>
                  </Flex>
                ))}
              </VStack>
            </VStack>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={onClose} />
      </Sheet>
    </VStack>
  );
};

export default BasicInfo;
