import {
  Box,
  Button,
  Circle,
  Flex,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { deleteStampboard, stampboardDetail } from '@/apis/stamp';
import ConfirmModal from '@/components/Link/ConfirmModal';
import StampBoard from '@/components/Stamp/StampBoard';
import {
  ChevronDown,
  ChevronUp,
  Coupon,
  EditFilledIcon,
  LeftArrow,
  Notifications,
} from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';

interface StampboardProps {
  stampboardId: string;
}

const Stampboard = ({ stampboardId }: StampboardProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { back } = useRouter();
  const {
    memberType: { name },
  } = useRecoilValue(userInfoAtom);
  const { data } = useQuery(['stampboard', stampboardId], () =>
    stampboardDetail(stampboardId)
  );

  const [memberType, setMemberType] = useState('');
  const [buttonMsg, setButtonMsg] = useState('');
  const [description, setDescription] = useState('');
  const [moreMission, setMoreMission] = useState(false);

  const stampboard = data?.data;
  const isMissionRequest = !!stampboard?.missionRequestList.length;
  const createdDate = new Date(stampboard?.createdDate || '');
  const completedDate = new Date(stampboard?.completedDate || '');
  const currentDate = new Date();
  const diffDate = Math.ceil(
    (currentDate.getTime() - createdDate.getTime()) / (1000 * 3600 * 24)
  );
  const isCompleted = stampboard?.status === 'completed';
  const completingDate = Math.ceil(
    (completedDate.getTime() - createdDate.getTime()) / (1000 * 3600 * 24)
  );

  const showMoreMissionText = stampboard?.missions
    ? stampboard.missions.length > 3
    : false;

  const { mutate: remove, isLoading } = useMutation(
    () => deleteStampboard(stampboardId),
    {
      onSuccess: () => {
        back();
      },
    }
  );

  const handleClickBack = () => {
    back();
  };

  const handleClickMoreButton = () => {
    setMoreMission(!moreMission);
  };

  useEffect(() => {
    setMemberType(name);
    const isMemberTypeKid = name === 'KID';
    setButtonMsg(isMemberTypeKid ? '쿠폰 받기' : '쿠폰 발급하기');
    setDescription(
      isMemberTypeKid
        ? '도장판을 다 채우면 쿠폰을 받을 수 있어요.'
        : '도장판을 다 채우면 쿠폰을 발급해줄 수 있어요.'
    );
  }, [setButtonMsg, setDescription, name]);

  return (
    <VStack w="100%" h="100%">
      <VStack w="100%" p="20px 5%" bg="#F8F8FC">
        <Flex pb="10px" w="100%" justify="space-between" align="center">
          <LeftArrow
            w="24px"
            h="24px"
            fill="gray.700"
            onClick={handleClickBack}
          />
          <EditFilledIcon w="24px" h="24px" />
        </Flex>
        <Flex w="100%" pb="10px" justify="space-between" align="center">
          <Text layerStyle="title24Sbd" color="rgba(46, 48, 56, 1)">
            {stampboard?.name}
          </Text>
          <Box
            bg="#59B9FF"
            borderRadius="6px"
            color="white"
            p="4px 8px"
            layerStyle="subtitle16Sbd"
          >
            {isCompleted ? `${completingDate}일 걸렸어요!` : `D+${diffDate}`}
          </Box>
        </Flex>
        {memberType !== 'KID' && isMissionRequest && (
          <Flex w="100%" pb="10px">
            <Flex
              w="100%"
              p="12px 16px"
              align="center"
              bg="#F0F7FF"
              layerStyle="body14Sbd"
              color="polzzak.highlighted"
              border="1px solid rgba(13, 122, 211, 0.16)"
              borderRadius="8px"
              gap="8px"
            >
              <Notifications w="20px" h="20px" /> 도장 요청이 있어요!
            </Flex>
          </Flex>
        )}
        <StampBoard stampboardId={stampboardId} />
      </VStack>
      <VStack w="100%" p="20px 5%" bg="#fff" spacing="23px">
        <Flex w="100%" justify="space-between" align="center">
          <Text layerStyle="subtitle16Sbd" color="rgba(46, 48, 56, 1)">
            미션 목록
          </Text>
          {showMoreMissionText && (
            <Text
              layerStyle="body13Md"
              color="gray.500"
              cursor="pointer"
              onClick={handleClickMoreButton}
            >
              더보기
              <Icon
                as={moreMission ? ChevronUp : ChevronDown}
                w="24px"
                h="24px"
              />
            </Text>
          )}
        </Flex>
        <VStack w="100%" spacing="18px">
          {moreMission
            ? stampboard?.missions.map(({ id, content }) => (
                <Text w="100%" key={id} layerStyle="body14Md" color="#2E3038">
                  {content}
                </Text>
              ))
            : stampboard?.missions.slice(0, 3).map(({ id, content }) => (
                <Text w="100%" key={id} layerStyle="body14Md" color="#2E3038">
                  {content}
                </Text>
              ))}
        </VStack>
      </VStack>
      <Box w="100%" h="8px" bg="#F8F8FC" />
      <VStack w="100%" p="20px 5%" bg="#fff" spacing="16px">
        <Flex w="100%" justify="space-between" align="center">
          <Text layerStyle="subtitle16Sbd" color="rgba(46, 48, 56, 1)">
            보상
          </Text>
        </Flex>
        <VStack pb="10px" w="100%" spacing="16px">
          <Circle size="80px" bg="#C7E5FF">
            <Coupon w="48px" h="48px" />
          </Circle>
          <Text layerStyle="subtitle18Sbd" color="#2E3038">
            {stampboard?.reward}
          </Text>
        </VStack>
        <VStack w="100%" spacing="14px" pb="30px">
          <Button
            w="100%"
            h="auto"
            p="14px 0"
            bg="polzzak.default"
            isDisabled={
              stampboard?.stamps.length !== stampboard?.goalStampCount
            }
          >
            <Text layerStyle="subtitle16Sbd" color="white">
              {buttonMsg}
            </Text>
          </Button>
          <Text layerStyle="body13Md" color="gray.500">
            {description}
          </Text>
        </VStack>
        {memberType !== 'KID' && (
          <Text
            fontSize="13px"
            fontWeight="600"
            textDecor="underline"
            color="gray.500"
            cursor="pointer"
            onClick={onOpen}
          >
            도장판 삭제하기
          </Text>
        )}
      </VStack>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        handleClickCancelButton={onClose}
        cancelMessage="아니요"
        confirmMessage="네, 삭제할래요"
        handleClickConfirmButton={remove}
        isLoading={isLoading}
      >
        <VStack w="100%" spacing="8px">
          <Text layerStyle="subtitle18Sbd" textAlign="center">
            도장판을 정말 삭제하시겠어요?
          </Text>
          <Text layerStyle="body16Md" textAlign="center" color="gray.500">
            (20P 차감돼요)
          </Text>
        </VStack>
      </ConfirmModal>
    </VStack>
  );
};

export default Stampboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { stampboardId } = context.query;
  return {
    props: {
      stampboardId,
    },
  };
};
