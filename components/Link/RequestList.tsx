import {
  Box,
  Button,
  Circle,
  Flex,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import {
  approveRequest,
  cancelRequest,
  receivedRequest,
  rejectRequest,
  sentRequest,
} from '@/apis/family';
import { TOKEN_KEY } from '@/constants/auth';
import { MailIcon } from '@/public/icon';
import { getLocalStorage } from '@/utils/storage';

import ConfirmModal from './ConfirmModal';

const RequestList = () => {
  const [selected, setSelected] = useState({
    memberId: 0,
    nickname: '',
  });

  const approveModal = useDisclosure();
  const rejectModal = useDisclosure();
  const toast = useToast();

  const token = getLocalStorage(TOKEN_KEY);

  const { data: received, refetch: receivedRefetch } = useQuery(
    ['request', 'received'],
    receivedRequest,
    {
      enabled: !!token,
    }
  );
  const { data: sent, refetch: sentRefetch } = useQuery(
    ['request', 'sent'],
    sentRequest,
    {
      enabled: !!token,
    }
  );

  const receivedRequests = received?.data?.families;
  const sentRequests = sent?.data?.families;

  const isNoReceivedRequests =
    !receivedRequests || receivedRequests.length === 0;
  const isNoSentRequests = !sentRequests || sentRequests.length === 0;
  const isAllNoRequests = isNoReceivedRequests && isNoSentRequests;

  const approve = useMutation((targetId: number) => approveRequest(targetId), {
    onSuccess: () => {
      receivedRefetch();
      //   familyRefetch();
      approveModal.onClose();
    },
  });

  const reject = useMutation((targetId: number) => rejectRequest(targetId), {
    onSuccess: () => {
      receivedRefetch();
      //   familyRefetch();
      rejectModal.onClose();
    },
  });

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

  const handleClickApproveButton = (memberId: number, nickname: string) => {
    setSelected({ memberId, nickname });
    approveModal.onOpen();
  };

  const handleClickConfirmApproveButton = () => {
    if (!received?.data) return;
    approve.mutate(selected.memberId);
  };

  const handleClickRejectButton = (memberId: number, nickname: string) => {
    setSelected({ memberId, nickname });
    rejectModal.onOpen();
  };

  const handleClickConfirmRejectButton = () => {
    if (!received?.data) return;
    reject.mutate(selected.memberId);
  };

  return (
    <Box w="100%">
      <Flex w="100%" p="0 0 16px 0" gap="6px" align="center">
        <MailIcon w="14px" h="14px" />
        <Text layerStyle="subtitle2" color="gray.500">
          요청 목록
        </Text>
      </Flex>
      {isAllNoRequests ? (
        <Text layerStyle="body1" color="gray.500">
          연동 요청이 없어요
        </Text>
      ) : (
        <VStack w="100%" spacing="30px">
          {!isNoReceivedRequests && (
            <VStack w="100%" spacing="10px" align="center">
              <Text layerStyle="body2" color="gray.500" alignSelf="flex-start">
                나에게 온 연동 요청
              </Text>
              {receivedRequests?.map(({ memberId, profileUrl, nickname }) => (
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
                  <Flex gap="10px">
                    <Button
                      variant="unstyled"
                      fontSize="14px"
                      fontWeight="600"
                      color="white"
                      bg="blue.500"
                      h="28px"
                      p="0 16px"
                      onClick={() =>
                        handleClickApproveButton(memberId, nickname)
                      }
                    >
                      수락
                    </Button>
                    <Button
                      variant="unstyled"
                      fontSize="14px"
                      fontWeight="600"
                      color="white"
                      bg="error.500"
                      h="28px"
                      p="0 16px"
                      onClick={() =>
                        handleClickRejectButton(memberId, nickname)
                      }
                    >
                      거절
                    </Button>
                  </Flex>
                </Flex>
              ))}
            </VStack>
          )}
          {!isNoSentRequests && (
            <VStack w="100%" spacing="10px" align="center">
              <Text layerStyle="body2" color="gray.500" alignSelf="flex-start">
                내가 보낸 연동 요청
              </Text>
              {sentRequests?.map(({ memberId, profileUrl, nickname }) => (
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
      )}
      <ConfirmModal
        isOpen={approveModal.isOpen}
        onClose={approveModal.onClose}
        handleClickCancelButton={approveModal.onClose}
        handleClickConfirmButton={handleClickConfirmApproveButton}
        isLoading={approve.isLoading}
      >
        <Text layerStyle="body7" color="gray.700" textAlign="center">
          <Text as="span" layerStyle="body6">
            {selected.nickname}
          </Text>
          님의
          <br />
          연동 요청을 수락하시겠어요?
        </Text>
      </ConfirmModal>
      <ConfirmModal
        isOpen={rejectModal.isOpen}
        onClose={rejectModal.onClose}
        handleClickCancelButton={rejectModal.onClose}
        handleClickConfirmButton={handleClickConfirmRejectButton}
        isLoading={reject.isLoading}
        confirmMessage="네, 거절할래요"
      >
        <Text layerStyle="body7" color="gray.700" textAlign="center">
          <Text as="span" layerStyle="body6">
            {selected.nickname}
          </Text>
          님의
          <br />
          연동 요청을 거절하시겠어요?
        </Text>
      </ConfirmModal>
    </Box>
  );
};

export default RequestList;
