import { Button, Circle, Flex, Text, useToast, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';

import { cancelRequest, sentRequest } from '@/apis/family';
import { TOKEN_KEY } from '@/constants/auth';
import { getLocalStorage } from '@/utils/storage';

const SentRequest = () => {
  const toast = useToast();
  const { query } = useRouter();

  const tab = query.tab as string;
  const token = getLocalStorage(TOKEN_KEY);

  const enableFetch = tab === 'sent' && !!token;

  const { data: sent, refetch: sentRefetch } = useQuery(
    ['request', 'sent'],
    sentRequest,
    {
      enabled: enableFetch,
    }
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

  return isNoSentRequests ? (
    <VStack w="100%" h="300px" justify="center">
      <Text layerStyle="body1" color="gray.500">
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
  );
};

export default SentRequest;
