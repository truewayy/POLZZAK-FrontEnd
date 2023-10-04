import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { couponDetail, receiveGift, requestGift } from '@/apis/coupon';
import { userInfo } from '@/apis/user';
import Loading from '@/components/Common/Loading';
import ConfirmModal from '@/components/Link/ConfirmModal';
import { Dash, LeftArrow, Picture, RightNavigation } from '@/public/icon';
import sleep from '@/utils/sleep';

const Coupon = () => {
  const captureRef = useRef<HTMLDivElement>(null);
  const [captureLoading, setCaptureLoading] = useState<boolean>(false);
  const [remainRequestTime, setRemainingTime] = useState('00:00');

  const queryClient = useQueryClient();
  const receiveModal = useDisclosure();
  const missionsModal = useDisclosure();

  const { query, back } = useRouter();
  const { couponId } = query;
  const { data: coupon } = useQuery(
    ['coupon', couponId],
    () => couponDetail(couponId as string),
    {
      enabled: !!couponId,
    }
  );
  const { data: user } = useQuery(['userInfo'], userInfo);
  const memberType = user?.data?.memberType;

  const [isKid, setIsKid] = useState<boolean>(false);

  const dateCal = Math.floor(
    (new Date(coupon?.endDate || new Date()).getTime() -
      new Date(coupon?.startDate || new Date()).getTime()) /
      1000 /
      60 /
      60 /
      24 +
      1
  );

  const { mutate: receive, isLoading: receiveLoading } = useMutation(
    () => receiveGift(couponId as string),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('couponList');
        queryClient.invalidateQueries(['coupon', couponId]);
        receiveModal.onClose();
      },
    }
  );

  const { mutate: request } = useMutation(
    () => requestGift(couponId as string),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('couponList');
        queryClient.invalidateQueries(['coupon', couponId]);
      },
    }
  );

  const handleClickReceiveButton = () => {
    receiveModal.onOpen();
  };

  const handleClickCompletedMissions = () => {
    missionsModal.onOpen();
  };

  const handleClickConfirmButton = () => {
    receive();
  };

  const handleClickReqeustButton = () => {
    request();
  };

  useEffect(() => {
    if (!coupon?.rewardRequestDate) return;
    const rewardRequestTime = Math.floor(
      (new Date(coupon?.rewardRequestDate).getTime() - new Date().getTime()) /
        1000
    );
    if (rewardRequestTime < -36000) return setRemainingTime('00:00');
    const interval = setInterval(() => {
      // MM:SS
      const rewardRequestMinute = Math.floor(rewardRequestTime / 60) + 600;
      const rewardRequestSecond = (rewardRequestTime % 60) + 60;
      const rewardRequestTimeFormat = `${String(rewardRequestMinute).padStart(
        2,
        '0'
      )}:${String(rewardRequestSecond).padStart(2, '0')}`;
      setRemainingTime(rewardRequestTimeFormat);
    }, 1000);

    return () => clearInterval(interval);
  }, [coupon?.rewardRequestDate, remainRequestTime]);

  const handleDownload = async () => {
    setCaptureLoading(true);
    if (!captureRef.current) return;

    try {
      await sleep(1000);
      const div = captureRef.current;
      const canvas = await html2canvas(div, {
        allowTaint: true,
        useCORS: true,
      });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, 'polzzak-gift.png');
        }
      });
    } catch (error) {
      console.error('Error converting div to image:', error);
    }
    setCaptureLoading(false);
  };

  useEffect(() => {
    if (memberType?.name === 'KID') {
      setIsKid(true);
    }
  }, [memberType]);

  return (
    <>
      {captureLoading && <Loading />}
      <VStack
        ref={captureRef}
        bg="polzzak.default"
        minH="100vh"
        spacing="30px"
        pos="relative"
      >
        <Flex w="100%" p="10px 16px" justify="space-between">
          <LeftArrow w="24px" h="24px" fill="white" onClick={back} />
          <Picture w="30px" h="30px" onClick={handleDownload} />
        </Flex>
        <VStack w="100%" spacing="0px" p="0 5%">
          <VStack
            w="100%"
            p="26px"
            spacing="10px"
            bg="white"
            borderRadius="12px"
            pos="relative"
            overflow="hidden"
          >
            <Box w="100%" h="6px" pos="absolute" bg="blue.200" top="0" />
            <Text layerStyle="subtitle16Sbd" color="blue.600">
              Reward
            </Text>
            <Text layerStyle="subtitle20Sbd">{coupon?.reward}</Text>
            <Dash w="95%" h="16px" pos="absolute" bottom="-8px" zIndex="1" />
          </VStack>
          <VStack
            w="100%"
            p="24px 26px"
            spacing="24px"
            bg="white"
            borderRadius="12px"
            pos="relative"
          >
            <VStack w="100%" spacing="21px">
              <Flex w="100%" gap="14px" align="center">
                <Circle
                  size="44px"
                  bg={`url(${coupon?.kid.profileUrl})`}
                  bgSize="cover"
                  bgPos="center"
                  bgRepeat="no-repeat"
                />
                <VStack spacing="2px" align="flex-start">
                  <Text layerStyle="body13Md" color="gray.500">
                    받는 사람
                  </Text>
                  <Text layerStyle="subtitle16Sbd" color="gray.800">
                    {coupon?.kid.nickname}
                  </Text>
                </VStack>
              </Flex>
              <Flex w="100%" gap="14px" align="center">
                <Circle
                  size="44px"
                  bg={`url(${coupon?.guardian.profileUrl})`}
                  bgSize="cover"
                  bgPos="center"
                  bgRepeat="no-repeat"
                />
                <VStack spacing="2px" align="flex-start">
                  <Text layerStyle="body13Md" color="gray.500">
                    주는 사람
                  </Text>
                  <Text layerStyle="subtitle16Sbd" color="gray.800">
                    {coupon?.guardian.nickname}
                  </Text>
                </VStack>
              </Flex>
            </VStack>
            <VStack w="100%" spacing="20px">
              <Box h="1.5px" w="100%" bg="gray.200" />
              <Grid w="100%" templateColumns="repeat(3, 1fr)">
                <VStack spacing="2px">
                  <Flex
                    align="center"
                    cursor="pointer"
                    pos="relative"
                    onClick={handleClickCompletedMissions}
                  >
                    <Text layerStyle="body13Md" color="gray.500">
                      완료 미션
                    </Text>
                    <RightNavigation w="12px" h="12px" fill="gray.400" />
                  </Flex>
                  <Text layerStyle="subtitle18Sbd" color="blue.600">
                    {coupon?.missionContents.length}{' '}
                    <Text as="span" layerStyle="caption12Sbd" color="blue.600">
                      개
                    </Text>
                  </Text>
                </VStack>
                <VStack spacing="2px">
                  <Text layerStyle="body13Md" color="gray.500">
                    모은 도장
                  </Text>
                  <Text layerStyle="subtitle18Sbd" color="blue.600">
                    {coupon?.stampCount}{' '}
                    <Text as="span" layerStyle="caption12Sbd" color="blue.600">
                      개
                    </Text>
                  </Text>
                </VStack>
                <VStack spacing="2px">
                  <Text layerStyle="body13Md" color="gray.500">
                    걸린 기간
                  </Text>
                  <Text layerStyle="subtitle18Sbd" color="blue.600">
                    {dateCal}{' '}
                    <Text as="span" layerStyle="caption12Sbd" color="blue.600">
                      일
                    </Text>
                  </Text>
                </VStack>
              </Grid>
            </VStack>
            <Dash w="95%" h="16px" pos="absolute" bottom="-8px" zIndex="1" />
          </VStack>
          <Flex
            w="100%"
            p="24px 36px"
            bg="white"
            borderRadius="12px"
            gap="30px"
            justify="space-around"
            pos="relative"
            overflow="hidden"
          >
            <VStack spacing="2px" align="flex-start">
              <Text layerStyle="body13Md" color="gray.500">
                미션 시작일
              </Text>
              <Text layerStyle="subtitle18Sbd" color="gray.800">
                {dayjs(coupon?.startDate).format('YYYY. MM. DD')}
              </Text>
            </VStack>
            <VStack spacing="2px" align="flex-start">
              <Text layerStyle="body13Md" color="gray.500">
                미션 완료일
              </Text>
              <Text layerStyle="subtitle18Sbd" color="gray.800">
                {dayjs(coupon?.endDate).format('YYYY. MM. DD')}
              </Text>
            </VStack>
            <Box
              w="100%"
              h="6px"
              pos="absolute"
              bg="blue.200"
              bottom="0"
              left="0"
            />
          </Flex>
        </VStack>
        {coupon?.state === 'REWARDED' && isKid && !captureLoading && (
          <Box
            p="6px 12px"
            borderRadius="100px"
            bg="blue.600"
            layerStyle="body14Sbd"
            color="white"
          >
            선물 받기 완료
          </Box>
        )}
        {coupon?.state === 'REWARDED' && !isKid && !captureLoading && (
          <Box
            p="6px 12px"
            borderRadius="100px"
            bg="blue.600"
            layerStyle="body14Sbd"
            color="white"
          >
            선물 전달 완료
          </Box>
        )}
        {coupon?.state === 'ISSUED' && !captureLoading && (
          <Text
            layerStyle="body14Sbd"
            textAlign="center"
            color="gray.700"
            pb="130px"
          >
            <Text color="#fff" as="span">
              {dayjs(coupon?.rewardDate).format('YYYY. MM. DD')}
            </Text>{' '}
            까지 <br />
            선물을 전달하기로 약속했어요!
          </Text>
        )}
        {captureLoading && (
          <Text layerStyle="title20Xbd" color="white" opacity="0.5">
            PolZZak!
          </Text>
        )}
        {coupon?.state === 'ISSUED' && isKid && !captureLoading && (
          <Flex w="100%" gap="7px" p="0 5%" pb="30px" pos="absolute" bottom="0">
            {remainRequestTime === '00:00' ? (
              <Button
                variant="unstyled"
                w="100%"
                h="auto"
                p="14px"
                bg="blue.600"
                layerStyle="subtitle16Sbd"
                color="white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickReqeustButton();
                }}
              >
                선물 조르기
              </Button>
            ) : (
              <Button
                variant="unstyled"
                w="100%"
                h="auto"
                p="8.5px"
                border="1px solid"
                borderColor="white"
                borderRadius="5px"
                bg="blue.500"
                color="white"
                cursor="default"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {remainRequestTime}
              </Button>
            )}
            <Button
              w="100%"
              h="auto"
              p="14px"
              bg="white"
              layerStyle="subtitle16Sbd"
              color="blue.600"
              onClick={handleClickReceiveButton}
            >
              선물 받기 완료
            </Button>
          </Flex>
        )}
        <ConfirmModal
          isOpen={receiveModal.isOpen}
          isLoading={receiveLoading}
          onClose={receiveModal.onClose}
          handleClickConfirmButton={handleClickConfirmButton}
          handleClickCancelButton={receiveModal.onClose}
          confirmMessage="네, 받았어요!"
        >
          <VStack spacing="8px">
            <Text layerStyle="subtitle18Sbd" color="blue.600">
              {coupon?.reward}
            </Text>
            <Text layerStyle="body16Md" color="gray.800">
              선물을 실제로 전달받았나요?
            </Text>
          </VStack>
        </ConfirmModal>
        <Modal
          isOpen={missionsModal.isOpen}
          onClose={missionsModal.onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalBody>
            <ModalContent borderRadius="12px">
              <VStack p="16px" pt="30px" spacing="24px">
                <Flex
                  layerStyle="subtitle16Sbd"
                  color="gray.800"
                  gap="8px"
                  align="center"
                >
                  완료한 미션
                  <Text as="span" color="polzzak.default">
                    {coupon?.missionContents.length}
                  </Text>
                </Flex>
                <VStack
                  w="100%"
                  h="300px"
                  p="12px"
                  spacing="0px"
                  overflowY="auto"
                >
                  {coupon?.missionContents.map((mission) => (
                    <Box
                      key={mission}
                      w="100%"
                      p="14px 0"
                      borderBottom="1px solid"
                      borderColor="gray.200"
                    >
                      {mission}
                    </Box>
                  ))}
                </VStack>
                <Button
                  w="100%"
                  h="50px"
                  borderRadius="8px"
                  bg="blue.500"
                  layerStyle="subtitle16Sbd"
                  color="white"
                  onClick={missionsModal.onClose}
                >
                  닫기
                </Button>
              </VStack>
            </ModalContent>
          </ModalBody>
        </Modal>
      </VStack>
    </>
  );
};

export default Coupon;
