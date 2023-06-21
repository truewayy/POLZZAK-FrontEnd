import {
  Box,
  Button,
  Circle,
  Flex,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { cancelRequest, sentRequest } from '@/apis/family';
import SearchInput from '@/components/Link/SearchInput/SearchInput';
import NextStepButton from '@/components/SignUp/Button';
import ROUTES from '@/constants/routes';
import { userInfoAtom } from '@/store/userInfo';

const FindFamily = () => {
  const { push } = useRouter();
  const { memberType } = useRecoilValue(userInfoAtom);
  const toast = useToast();

  const [type] = useState(memberType);

  const { data: sent, refetch: sentRefetch } = useQuery(
    ['request', 'sent'],
    sentRequest
  );

  const cancel = useMutation((targetId: number) => cancelRequest(targetId), {
    onSuccess: () => {
      sentRefetch();
      toast({
        title: '연동 요청이 취소되었습니다.',
        position: 'bottom',
        status: 'warning',
        duration: 3000,
        isClosable: false,
        containerStyle: {
          width: '90%',
        },
      });
    },
  });

  const sentRequests = sent?.data?.families;
  const isNoSentRequests = !sentRequests || sentRequests.length === 0;

  const title = type.name === 'KID' ? '보호자 찾기' : '아이 찾기';
  const buttonMsg = isNoSentRequests ? '나중에 할게요' : '아이 찾기 완료';
  const buttonStyle = isNoSentRequests
    ? {
        bg: 'blue.200',
        color: 'white',
      }
    : {
        bg: 'polzzak.default',
        color: 'white',
      };

  const handleClickButton = () => {
    push(ROUTES.MAIN);
  };

  return (
    <VStack
      w="100%"
      minH="100vh"
      align="flex-start"
      bg="white"
      p="0 5% 26px 5%"
      pos="relative"
    >
      <Box pos="fixed" maxW="504px" w="90%" p="10px 0" bg="white">
        <Text w="100%" layerStyle="subtitle1" textAlign="center">
          {title}
        </Text>
      </Box>
      <Flex w="100%" p="54px 0 24px 0">
        <SearchInput />
      </Flex>
      <VStack w="100%" spacing="16px" align="center">
        <Text layerStyle="subtitle3" color="gray.600" alignSelf="flex-start">
          요청 보낸 목록
        </Text>
        {isNoSentRequests ? (
          <VStack w="100%">
            <Text w="100%" layerStyle="body1" color="gray.500" textAlign="left">
              보낸 요청이 없어요
            </Text>
          </VStack>
        ) : (
          <VStack w="100%" spacing="20px">
            {sentRequests.map(({ memberId, profileUrl, nickname }) => (
              <Flex w="100%" justify="space-between" key={memberId}>
                <Flex gap="10px" align="center">
                  <Circle
                    size="32px"
                    bgImage={profileUrl}
                    bgSize="cover"
                    bgPosition="center"
                    bgRepeat="no-repeat"
                  />
                  <Text layerStyle="body2">{nickname}</Text>
                </Flex>
                <Button
                  variant="unstyled"
                  fontSize="14px"
                  fontWeight="600"
                  color="white"
                  bg="error.500"
                  h="28px"
                  p="0 16px"
                  onClick={() => cancel.mutate(memberId)}
                >
                  요청 취소
                </Button>
              </Flex>
            ))}
          </VStack>
        )}
      </VStack>
      <NextStepButton {...buttonStyle} onClick={handleClickButton}>
        {buttonMsg}
      </NextStepButton>
    </VStack>
  );
};

export default FindFamily;
