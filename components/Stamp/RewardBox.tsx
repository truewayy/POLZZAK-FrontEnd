import {
  Button,
  Circle,
  Flex,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sheet from 'react-modal-sheet';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { issueCoupon, receiveCoupon } from '@/apis/coupon';
import { deleteStampboard, stampboardDetail } from '@/apis/stamp';
import { userInfo } from '@/apis/user';
import { Calendar, Coupon } from '@/public/icon';

import Loading from '../Common/Loading';
import ConfirmModal from '../Link/ConfirmModal';
import CouponIssuedModal from './CouponIssuedModal';
import DatepickerModal from './DatePickerModal';

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

interface RewardBoxProps {
  stampboardId: string;
}

const RewardBox = ({ stampboardId }: RewardBoxProps) => {
  const queryClient = useQueryClient();
  const stampboardDelete = useDisclosure();
  const datepicker = useDisclosure();
  const couponIssueModal = useDisclosure();
  const { back } = useRouter();

  const { data: user } = useQuery(['userInfo'], userInfo);
  const name = user?.data?.memberType.name;

  const { data } = useQuery(['stampboard', stampboardId], () =>
    stampboardDetail(stampboardId)
  );

  const [buttonMsg, setButtonMsg] = useState('');
  const [description, setDescription] = useState('');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [confirmedDate, setConfirmedDate] = useState<Date>();
  const [bottomSheetDescription, setBottomSheetDescription] = useState('');

  const stampboard = data?.data;
  const isKid = name === 'KID';

  const rewardDate = () => {
    if (!isKid) {
      if (confirmedDate !== undefined)
        return dayjs(confirmedDate).format('YYYY.MM.DD');
      return '날짜를 설정해주세요';
    }
    return dayjs(stampboard?.rewardDate).format('YYYY.MM.DD');
  };

  const { mutate: remove, isLoading } = useMutation(
    () => deleteStampboard(stampboardId),
    {
      onSuccess: () => {
        back();
      },
    }
  );

  const { mutate: issue, isLoading: issueLoading } = useMutation(
    () => issueCoupon(stampboardId, confirmedDate?.getTime() ?? 0),
    {
      onSuccess: (res) => {
        if (res.code === 201) {
          couponIssueModal.onOpen();
          queryClient.invalidateQueries(['stampboard', stampboardId]);
        }
      },
    }
  );

  const { mutate: receive, isLoading: receiveloading } = useMutation(
    () => receiveCoupon(stampboardId),
    {
      onSuccess: (res) => {
        if (res.code === 201) {
          couponIssueModal.onOpen();
          queryClient.invalidateQueries(['stampboard', stampboardId]);
        }
      },
    }
  );

  const handleClickIssue = () => {
    setShowBottomSheet(false);
    if (isKid) {
      receive();
    } else {
      issue();
    }
  };

  const openBottomSheet = () => {
    setShowBottomSheet(true);
  };
  const closeBottomSheet = () => {
    setShowBottomSheet(false);
  };

  useEffect(() => {
    if (stampboard) {
      setButtonMsg(
        isKid
          ? kidCouponIssueButtonMsg[stampboard?.status]
          : guardianCouponIssueButtonMsg[stampboard?.status]
      );
      setDescription(
        isKid
          ? kidCouponIssueDescription[stampboard?.status]
          : guardianCouponIssueDescription[stampboard?.status]
      );
      setBottomSheetDescription(
        isKid ? '쿠폰을 선물 받았어요!' : '쿠폰이 활성화 되었어요!'
      );
    }
  }, [setButtonMsg, name, stampboard, isKid]);

  return (
    <>
      {(issueLoading || receiveloading) && <Loading />}

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
              isKid
                ? kidCouponIssueButtonDisabled[stampboard?.status ?? 'progress']
                : guardianCouponIssueButtonDisabled[
                    stampboard?.status ?? 'progress'
                  ]
            }
            _disabled={{
              bg: 'polzzak.default',
              opacity: 0.3,
              cursor: 'not-allowed',
              _hover: {
                bg: 'polzzak.default',
                opacity: 0.3,
              },
            }}
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
        {!isKid && (
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

        <CouponIssuedModal
          reward={stampboard?.reward || ''}
          isOpen={couponIssueModal.isOpen}
          onClose={couponIssueModal.onClose}
        />

        <Sheet
          isOpen={showBottomSheet}
          onClose={closeBottomSheet}
          snapPoints={[480, 350, 200, 0]}
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
                h={430}
                bg="white"
                p="20px 5%"
                spacing={isKid ? '50px' : '30px'}
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
                    {bottomSheetDescription}
                  </Text>
                </Text>
                <Circle size={isKid ? '120px' : '100px'} bg="#C7E5FF">
                  <Coupon
                    w={isKid ? '72px' : '60px'}
                    h={isKid ? '72px' : '60px'}
                  />
                </Circle>
                <VStack w="100%" spacing="22px">
                  {!isKid && (
                    <Text
                      layerStyle="caption12Md"
                      color="gray.500"
                      textAlign="center"
                    >
                      언제까지 선물을 주실 예정인가요?
                      <br />
                      선물 예정일은 수정이 불가하니 신중하게 정해주세요.
                    </Text>
                  )}
                  <Flex
                    w="100%"
                    p="14px 16px"
                    borderRadius="8px"
                    border="1px solid"
                    borderColor="gray.200"
                    bg="gray.100"
                    justify="space-between"
                    align="center"
                    cursor={isKid ? 'default' : 'pointer'}
                    onClick={isKid ? () => {} : datepicker.onOpen}
                  >
                    <Text layerStyle="body14Md" color="gray.500">
                      선물 예정일
                    </Text>
                    <Flex gap="8px" align="center">
                      <Text layerStyle="body14Md" color="gray.800">
                        {rewardDate()}
                      </Text>
                      {!isKid && <Calendar w="20px" h="20px" />}
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
                  isDisabled={!isKid && !confirmedDate}
                  onClick={handleClickIssue}
                >
                  {isKid ? '쿠폰 받기' : '쿠폰 발급하기'}
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
    </>
  );
};

export default RewardBox;
