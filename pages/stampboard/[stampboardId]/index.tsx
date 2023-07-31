import {
  Box,
  Button,
  Circle,
  Flex,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sheet from 'react-modal-sheet';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { issueCoupon } from '@/apis/coupon';
import { deleteStampboard, stampboardDetail } from '@/apis/stamp';
import ConfirmModal from '@/components/Link/ConfirmModal';
import DatepickerModal from '@/components/Stamp/DatePickerModal';
import MissionList from '@/components/Stamp/MissionList';
import StampBoard from '@/components/Stamp/StampBoard';
import {
  Calendar,
  Coupon,
  EditFilledIcon,
  LeftArrow,
  Notifications,
} from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';

interface StampboardProps {
  stampboardId: string;
}

const guardianCouponIssueButtonMsg = {
  progress: '쿠폰 발급하기',
  completed: '쿠폰 발급하기',
  issued_coupon: '쿠폰 발급 완료',
  rewarded: '쿠폰 발급 완료',
};

const guardianCouponIssueButtonDisabled = {
  progress: true,
  completed: false,
  issued_coupon: true,
  rewarded: true,
};

const guardianCouponIssueDescription = {
  progress: '도장판이 다 채워지면 쿠폰을 발급해줄 수 있어요',
  completed: '도장판이 다 채워졌어요! 쿠폰을 발급해주세요',
  issued_coupon: '내 쿠폰함에서 확인하세요',
  rewarded: '내 쿠폰함에서 확인하세요',
};

const kidCouponIssueButtonMsg = {
  progress: '쿠폰 받기',
  completed: '쿠폰 받기',
  issued_coupon: '쿠폰 받기',
  rewarded: '쿠폰 받기 완료',
};

const kidCouponIssueButtonDisabled = {
  progress: true,
  completed: true,
  issued_coupon: false,
  rewarded: true,
};

const kidCouponIssueDescription = {
  progress: '도장판을 다 채우면 쿠폰을 받을 수 있어요',
  completed: '보호자가 쿠폰을 발급해줄 때까지 잠시만 기다려주세요',
  issued_coupon: '선물 쿠폰이 도착했어요!',
  rewarded: '내 쿠폰함에서 확인하세요',
};

const Stampboard = ({ stampboardId }: StampboardProps) => {
  const stampboardDelete = useDisclosure();
  const datepicker = useDisclosure();
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
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [confirmedDate, setConfirmedDate] = useState<Date>();

  const stampboard = data?.data;
  const isMissionRequest = !!stampboard?.missionRequestList.length;
  const createdDate = new Date(stampboard?.createdDate ?? '');
  const completedDate = new Date(stampboard?.completedDate ?? '');
  const currentDate = new Date();
  const diffDate = Math.ceil(
    (currentDate.getTime() - createdDate.getTime()) / (1000 * 3600 * 24)
  );
  const isMemberTypeKid = name === 'KID';
  const isCompleted = stampboard?.status !== 'progress';
  const completingDate = Math.ceil(
    (completedDate.getTime() - createdDate.getTime()) / (1000 * 3600 * 24)
  );

  const { mutate: remove, isLoading } = useMutation(
    () => deleteStampboard(stampboardId),
    {
      onSuccess: () => {
        back();
      },
    }
  );

  const { mutate: issue } = useMutation(
    () => issueCoupon(stampboardId, confirmedDate?.getTime() ?? 0),
    {
      onSuccess: () => {
        console.log('success');
      },
    }
  );

  const handleClickIssue = () => {
    issue();
  };

  const handleClickBack = () => {
    back();
  };

  const openBottomSheet = () => {
    setShowBottomSheet(true);
  };
  const closeBottomSheet = () => {
    setShowBottomSheet(false);
  };

  useEffect(() => {
    setMemberType(name);
    if (stampboard) {
      setButtonMsg(
        isMemberTypeKid
          ? kidCouponIssueButtonMsg[stampboard?.status]
          : guardianCouponIssueButtonMsg[stampboard?.status]
      );
      setDescription(
        isMemberTypeKid
          ? kidCouponIssueDescription[stampboard?.status]
          : guardianCouponIssueDescription[stampboard?.status]
      );
    }
  }, [setButtonMsg, name, stampboard, isMemberTypeKid]);

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
      <MissionList missions={stampboard?.missions} />
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
              isMemberTypeKid
                ? kidCouponIssueButtonDisabled[stampboard?.status || 'progress']
                : guardianCouponIssueButtonDisabled[
                    stampboard?.status || 'progress'
                  ]
            }
            onClick={openBottomSheet}
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
            onClick={stampboardDelete.onOpen}
          >
            도장판 삭제하기
          </Text>
        )}
      </VStack>
      <ConfirmModal
        isOpen={stampboardDelete.isOpen}
        onClose={stampboardDelete.onClose}
        handleClickCancelButton={stampboardDelete.onClose}
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
      <DatepickerModal
        setConfirmedDate={setConfirmedDate}
        isOpen={datepicker.isOpen}
        onClose={datepicker.onClose}
      />
      <Sheet
        isOpen={showBottomSheet}
        onClose={closeBottomSheet}
        snapPoints={[500, 350, 200, 0]}
        initialSnap={0}
        style={{
          maxWidth: '560px',
          width: '100%',
          margin: '0 auto',
          zIndex: 2,
        }}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <VStack
              w="100%"
              h={450}
              bg="white"
              p="20px 5%"
              spacing="30px"
              pos="relative"
            >
              <Text
                layerStyle="subtitle18Sbd"
                color="blue.600"
                textAlign="center"
              >
                {stampboard?.reward}
                <br />
                <Text as="span" layerStyle="subtitle16Sbd" color="#312F2E">
                  쿠폰이 활성화 되었어요!
                </Text>
              </Text>
              <Circle size="100px" bg="#C7E5FF">
                <Coupon w="60px" h="60px" />
              </Circle>
              <VStack w="100%" spacing="22px">
                <Text
                  layerStyle="caption12Md"
                  color="gray.500"
                  textAlign="center"
                >
                  언제까지 선물을 주실 예정인가요?
                  <br />
                  선물 예정일은 수정이 불가하니 신중하게 정해주세요.
                </Text>
                <Flex
                  w="100%"
                  p="14px 16px"
                  borderRadius="8px"
                  border="1px solid"
                  borderColor="gray.200"
                  bg="gray.100"
                  justify="space-between"
                  align="center"
                  cursor="pointer"
                  onClick={datepicker.onOpen}
                >
                  <Text layerStyle="body14Md" color="gray.500">
                    선물 예정일
                  </Text>
                  <Flex gap="8px" align="center">
                    <Text layerStyle="body14Md" color="gray.800">
                      {confirmedDate !== undefined
                        ? dayjs(confirmedDate).format('YYYY.MM.DD')
                        : '날짜를 설정해주세요'}
                    </Text>
                    <Calendar w="20px" h="20px" />
                  </Flex>
                </Flex>
              </VStack>
              <Button
                w="90%"
                h="50px"
                p="12px 0"
                layerStyle="subtitle16Sbd"
                bgColor="polzzak.default"
                color="white"
                pos="absolute"
                bottom="20px"
                isDisabled={!confirmedDate}
                onClick={handleClickIssue}
              >
                쿠폰 발급하기
              </Button>
            </VStack>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop
          onTap={closeBottomSheet}
          style={{ background: 'rgba(0, 0, 0, 0.4)' }}
        />
      </Sheet>
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
