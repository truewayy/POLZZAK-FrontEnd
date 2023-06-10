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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import {
  approveRequest,
  cancelRequest,
  familiesInfo,
  receivedRequest,
  rejectRequest,
  sentRequest,
} from '@/apis/family';
import ConfirmModal from '@/components/Link/ConfirmModal';
import SearchInput from '@/components/Link/SearchInput/SearchInput';
import { TOKEN_KEY } from '@/constants/auth';
import ROUTES from '@/constants/routes';
import { BackIcon, ClipIcon, MailIcon, XIcon } from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';
import { getLocalStorage } from '@/utils/storage';

const Link = () => {
  const approveModal = useDisclosure();
  const rejectModal = useDisclosure();
  const clearModal = useDisclosure();
  const [selected, setSelected] = useState({
    memberId: 0,
    nickname: '',
  });
  const toast = useToast();
  const token = getLocalStorage(TOKEN_KEY);
  const [userType, setUserType] = useState('');
  const { push } = useRouter();
  const {
    memberType: { name },
  } = useRecoilValue(userInfoAtom);
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
  const { data: family, refetch: familyRefetch } = useQuery(
    ['familes', 'list'],
    familiesInfo,
    {
      enabled: !!token,
    }
  );

  const approve = useMutation((targetId: number) => approveRequest(targetId), {
    onSuccess: () => {
      receivedRefetch();
      familyRefetch();
      approveModal.onClose();
    },
  });

  const reject = useMutation((targetId: number) => rejectRequest(targetId), {
    onSuccess: () => {
      receivedRefetch();
      familyRefetch();
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

  const clear = useMutation((targetId: number) => cancelRequest(targetId), {
    onSuccess: () => {
      familyRefetch();
      clearModal.onClose();
    },
  });
  const handleClickConfirmApproveButton = () => {
    if (!received?.data) return;
    approve.mutate(selected.memberId);
  };

  const handleClickApproveButton = (memberId: number, nickname: string) => {
    setSelected({ memberId, nickname });
    approveModal.onOpen();
  };

  const handleClickConfirmRejectButton = () => {
    if (!received?.data) return;
    reject.mutate(selected.memberId);
  };

  const handleClickRejectButton = (memberId: number, nickname: string) => {
    setSelected({ memberId, nickname });
    rejectModal.onOpen();
  };

  const handleClickConfirmClearButton = () => {
    if (!family?.data) return;
    clear.mutate(selected.memberId);
  };

  const handleClickClearButton = (memberId: number, nickname: string) => {
    setSelected({ memberId, nickname });
    clearModal.onOpen();
  };

  const handleClickBackButton = () => {
    push(ROUTES.MAIN);
  };
  const receivedRequests = received?.data?.families;
  const sentRequests = sent?.data?.families;
  const families = family?.data?.families;

  const isNoReceivedRequests =
    !receivedRequests || receivedRequests.length === 0;
  const isNoSentRequests = !sentRequests || sentRequests.length === 0;
  const isAllNoRequests = isNoReceivedRequests && isNoSentRequests;
  const isNoFamilies = !families || families.length === 0;

  useEffect(() => {
    setUserType(name === 'KID' ? '보호자' : '아이');
  }, [name]);

  return (
    <VStack w="100%" minH="100vh" bg="white">
      <VStack w="100%" align="flex-start" bg="white" p="0 5% 26px 5%">
        <Flex w="100%" p="10px 0" pos="fixed" bg="white">
          <BackIcon w="24px" h="24px" onClick={handleClickBackButton} />
        </Flex>
        <Flex w="100%" p="45px 0 10px 0">
          <Text layerStyle="title1">연동 관리</Text>
        </Flex>
        <Flex w="100%" p="14px 0 24px 0">
          <SearchInput />
        </Flex>
        <Flex w="100%" p="14px 0 16px 0" gap="6px" align="center">
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
                <Text
                  layerStyle="body2"
                  color="gray.500"
                  alignSelf="flex-start"
                >
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
                <Text
                  layerStyle="body2"
                  color="gray.500"
                  alignSelf="flex-start"
                >
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
      </VStack>
      <Box w="100%" h="8px" bg="gray.100" />
      <VStack
        w="100%"
        p="26px 5% 30px 5%"
        bg="white"
        align="flex-start"
        spacing="16px"
      >
        <Flex w="100%" gap="6px" align="center">
          <ClipIcon w="14px" h="14px" />
          <Text layerStyle="subtitle2" color="gray.500">
            나와 연동된 {userType} {families?.length}
          </Text>
        </Flex>
        {isNoFamilies ? (
          <Text layerStyle="body1" color="gray.500">
            연동된 {userType}가 없어요
          </Text>
        ) : (
          <VStack w="100%" spacing="20px">
            {families?.map(({ memberId, profileUrl, nickname }) => (
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
                <XIcon
                  w="24px"
                  h="24px"
                  onClick={() => handleClickClearButton(memberId, nickname)}
                />
              </Flex>
            ))}
          </VStack>
        )}
      </VStack>
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
      <ConfirmModal
        isOpen={clearModal.isOpen}
        onClose={clearModal.onClose}
        handleClickCancelButton={clearModal.onClose}
        handleClickConfirmButton={handleClickConfirmClearButton}
        isLoading={clear.isLoading}
        confirmMessage="네, 해제할래요"
      >
        <Text layerStyle="body7" color="gray.700" textAlign="center">
          <Text as="span" layerStyle="body6">
            {selected.nickname}
          </Text>
          님과
          <br />
          연동을 해제하시겠어요?
        </Text>
      </ConfirmModal>
    </VStack>
  );
};

export default Link;
