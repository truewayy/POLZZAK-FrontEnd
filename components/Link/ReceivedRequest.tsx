import {
  Button,
  Circle,
  Flex,
  Image,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
  approveRequest,
  familiesInfo,
  receivedRequest,
  rejectRequest,
} from '@/apis/family';
import { TOKEN_KEY } from '@/constants/auth';
import { getLocalStorage } from '@/utils/storage';

import ConfirmModal from './ConfirmModal';

const ReceivedRequest = () => {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState({
    memberId: 0,
    nickname: '',
  });
  const { query } = useRouter();

  const tab = query.tab as string;
  const token = getLocalStorage(TOKEN_KEY);

  const enableFetch = tab === 'received' && !!token;

  const approveModal = useDisclosure();
  const rejectModal = useDisclosure();

  const { data: received, refetch: receivedRefetch } = useQuery(
    ['request', 'received'],
    receivedRequest,
    {
      enabled: enableFetch,
    }
  );

  const approve = useMutation((targetId: number) => approveRequest(targetId), {
    onSuccess: async () => {
      receivedRefetch();
      await familiesInfo();
      queryClient.invalidateQueries(['newRequest']);
      approveModal.onClose();
    },
  });

  const reject = useMutation((targetId: number) => rejectRequest(targetId), {
    onSuccess: () => {
      receivedRefetch();
      queryClient.invalidateQueries(['newRequest']);
      //   familyRefetch();
      rejectModal.onClose();
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

  const receivedRequests = received?.data?.families;
  const isNoReceivedRequests =
    !receivedRequests || receivedRequests.length === 0;

  return isNoReceivedRequests ? (
    <VStack w="100%" h="300px" justify="center" spacing="12px">
      <Image src="/noSearchResult.png" w="84px" />
      <Text layerStyle="body15Md" color="gray.700">
        받은 요청이 없어요
      </Text>
    </VStack>
  ) : (
    <>
      <VStack w="100%" spacing="20px">
        {receivedRequests.map(({ memberId, profileUrl, nickname }) => (
          <Flex w="100%" justify="space-between" key={memberId}>
            <Flex gap="10px" align="center">
              <Circle
                size="32px"
                bgImage={profileUrl}
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
              />
              <Text layerStyle="body14Sbd">{nickname}</Text>
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
                onClick={() => handleClickApproveButton(memberId, nickname)}
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
                onClick={() => handleClickRejectButton(memberId, nickname)}
              >
                거절
              </Button>
            </Flex>
          </Flex>
        ))}
      </VStack>
      <ConfirmModal
        isOpen={approveModal.isOpen}
        onClose={approveModal.onClose}
        handleClickCancelButton={approveModal.onClose}
        handleClickConfirmButton={handleClickConfirmApproveButton}
        isLoading={approve.isLoading}
      >
        <Text layerStyle="body18Md" color="gray.700" textAlign="center">
          <Text as="span" layerStyle="body18Bd">
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
        <Text layerStyle="body18Md" color="gray.700" textAlign="center">
          <Text as="span" layerStyle="body18Bd">
            {selected.nickname}
          </Text>
          님의
          <br />
          연동 요청을 거절하시겠어요?
        </Text>
      </ConfirmModal>
    </>
  );
};

export default ReceivedRequest;
