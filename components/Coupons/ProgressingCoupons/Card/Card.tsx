/* eslint-disable no-nested-ternary */
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';

import { Coupon, receiveGift, requestGift } from '@/apis/coupon';
import { userInfoAtom } from '@/store/userInfo';

import CardView from './CardView';

const Card = ({ reward, rewardDate, couponId, rewardRequestDate }: Coupon) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [remainRequestTime, setRemainingTime] = useState('00:00');
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { memberType } = useRecoilValue(userInfoAtom);
  const isKid = memberType.name === 'KID';

  useEffect(() => {
    if (!rewardRequestDate) return;
    const rewardRequestTime = Math.floor(
      (new Date(rewardRequestDate).getTime() - new Date().getTime()) / 1000
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
  }, [rewardRequestDate, remainRequestTime]);

  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  const formattedDate = formatDate(rewardDate);
  const dateCal = Math.floor(
    (new Date(rewardDate).getTime() - new Date().getTime()) /
      1000 /
      60 /
      60 /
      24
  );
  const dateDiff = dateCal > 0 ? `-${dateCal}` : `+${-dateCal}`;

  const { mutate: receive, isLoading: receiveLoading } = useMutation(
    () => receiveGift(couponId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('couponList');
        onClose();
      },
    }
  );

  const { mutate: request } = useMutation(() => requestGift(couponId), {
    onSuccess: () => {
      queryClient.invalidateQueries('couponList');
      onClose();
    },
  });

  const handleClickReqeustButton = () => {
    request();
  };

  const handleClickReceiveButton = () => {
    onOpen();
  };

  const handleClickConfirmButton = () => {
    receive();
  };

  const handleClickCard = () => {
    push(`/coupon/${couponId}`);
  };

  const CardVAProps = {
    isOpen,
    isLoading: receiveLoading,
    onClose,
    remainRequestTime,
    reward,
    rewardDate: formattedDate,
    dateDiff,
    isKid,
    handleClickCard,
    handleClickReceiveButton,
    handleClickConfirmButton,
    handleClickReqeustButton,
  };

  return <CardView {...CardVAProps} />;
};

export default Card;
