/* eslint-disable react/require-default-props */
import {
  Button,
  Circle,
  Flex,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import { approveRequest, rejectRequest } from '@/apis/family';
import ConfirmModal from '@/components/Link/ConfirmModal';
import { CheckCircle, XCircle } from '@/public/icon';
import { notiDeleteOnAtom, notificationsAtom } from '@/store/notifications';

interface NotificationFrameProps {
  id: number;
  title: string;
  time: string;
  children: React.ReactNode;
  type: string;
  status:
    | 'READ'
    | 'UNREAD'
    | 'REQUEST_FAMILY'
    | 'REQUEST_FAMILY_ACCEPT'
    | 'REQUEST_FAMILY_REJECT';
  sender: {
    id: number;
    nickname: string;
    profileUrl: string;
  };
  link: string;
}

const NotificationFrame = ({
  id,
  title,
  time,
  children,
  type,
  status,
  sender,
  link,
}: NotificationFrameProps) => {
  const queryClient = useQueryClient();

  const { push } = useRouter();
  const isDeleteModeOn = useRecoilValue(notiDeleteOnAtom);
  const [deleteArr, setDeleteArr] = useRecoilState(notificationsAtom);

  const isChecked = deleteArr.includes(id);

  const isFamilyRequest =
    type === 'FAMILY_REQUEST' && status === 'REQUEST_FAMILY';
  const isFamilyRequestAccept = status === 'REQUEST_FAMILY_ACCEPT';
  const isFamilyRequestReject = status === 'REQUEST_FAMILY_REJECT';

  const onClickCheckCircle = () => {
    if (isDeleteModeOn) {
      if (deleteArr.includes(id)) {
        setDeleteArr(deleteArr.filter((item) => item !== id));
      } else {
        setDeleteArr([...deleteArr, id]);
      }
    }
  };

  const handleClickNotification = () => {
    if (isDeleteModeOn) {
      onClickCheckCircle();
    } else if (link) push(`/${link}`);
  };

  const approveModal = useDisclosure();
  const rejectModal = useDisclosure();

  const approve = useMutation((targetId: number) => approveRequest(targetId), {
    onSuccess: async () => {
      queryClient.invalidateQueries(['notifications']);
      approveModal.onClose();
    },
  });

  const reject = useMutation((targetId: number) => rejectRequest(targetId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      rejectModal.onClose();
    },
  });

  const handleClickApproveButton = () => {
    approveModal.onOpen();
  };

  const handleClickConfirmApproveButton = () => {
    approve.mutate(sender.id);
  };

  const handleClickRejectButton = () => {
    rejectModal.onOpen();
  };

  const handleClickConfirmRejectButton = () => {
    reject.mutate(sender.id);
  };

  return (
    <VStack
      w="100%"
      p="16px"
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="8px"
      spacing="16px"
      {...(isDeleteModeOn &&
        isChecked && {
          bg: 'error.100',
          border: '1px solid',
          borderColor: 'error.500',
        })}
      onClick={handleClickNotification}
    >
      <VStack w="100%" spacing="8px" align="flex-start">
        <Flex w="100%" justify="space-between" align="center">
          <Flex gap="7px" justify="flex-start" align="center">
            <Text layerStyle="subtitle16Bd">{title}</Text>
            <Circle size="4px" bg="gray.300" />
            <Text layerStyle="caption12Md" color="gray.500">
              {time}
            </Text>
          </Flex>
          {isDeleteModeOn && type !== 'linkRequest' && (
            <Circle
              size="16px"
              border="1.5px solid"
              borderColor="gray.500"
              cursor="pointer"
              {...(isChecked && {
                bg: 'error.500',
                borderColor: 'error.500',
                _after: {
                  content: '""',
                  display: 'block',
                  width: '7px',
                  height: '3px',
                  border: '2px solid white',
                  borderRadius: '0px',
                  borderTop: 'none',
                  borderRight: 'none',
                  transform: 'rotate(-45deg)',
                  transformOrigin: '40% 40%',
                },
              })}
              onClick={onClickCheckCircle}
            />
          )}
        </Flex>
        <Text layerStyle="body14Md" wordBreak="keep-all">
          {children}
        </Text>
      </VStack>
      {isFamilyRequest && (
        <Flex w="100%" gap="10px">
          <Button
            w="100%"
            p="8px 20px"
            bg="polzzak.default"
            borderRadius="8px"
            onClick={handleClickApproveButton}
          >
            <Text layerStyle="body16Md" color="white">
              수락
            </Text>
          </Button>
          <Button
            w="100%"
            p="8px 20px"
            bg="error.500"
            borderRadius="8px"
            onClick={handleClickRejectButton}
          >
            <Text layerStyle="body16Md" color="white">
              거절
            </Text>
          </Button>
        </Flex>
      )}
      {isFamilyRequestAccept && (
        <Flex
          w="100%"
          justify="center"
          align="center"
          p="8px 20px"
          bg="white"
          border="1px solid"
          borderColor="polzzak.default"
          borderRadius="8px"
          gap="8px"
          cursor="default"
        >
          <CheckCircle w="16px" h="16px" fill="polzzak.default" />
          <Text layerStyle="subtitle16Bd" color="polzzak.default">
            수락했어요
          </Text>
        </Flex>
      )}
      {isFamilyRequestReject && (
        <Flex
          w="100%"
          justify="center"
          align="center"
          p="8px 20px"
          bg="white"
          border="1px solid"
          borderColor="error.500"
          borderRadius="8px"
          gap="8px"
          cursor="default"
        >
          <XCircle w="20px" h="20px" fill="error.500" />
          <Text layerStyle="subtitle16Bd" color="error.500">
            거절했어요
          </Text>
        </Flex>
      )}
      <Flex w="100%" gap="4px" justify="flex-start" align="center">
        <Circle
          size="24px"
          bgImg={sender.profileUrl ?? 'gray.300'}
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
        />
        <Text layerStyle="caption12Md" color="gray.500">
          {sender.nickname}
        </Text>
      </Flex>
      <ConfirmModal
        isOpen={approveModal.isOpen}
        onClose={approveModal.onClose}
        handleClickCancelButton={approveModal.onClose}
        handleClickConfirmButton={handleClickConfirmApproveButton}
        isLoading={approve.isLoading}
      >
        <Text layerStyle="body18Md" color="gray.700" textAlign="center">
          <Text as="span" layerStyle="body18Bd">
            {sender.nickname}
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
            {sender.nickname}
          </Text>
          님의
          <br />
          연동 요청을 거절하시겠어요?
        </Text>
      </ConfirmModal>
    </VStack>
  );
};

export default NotificationFrame;
