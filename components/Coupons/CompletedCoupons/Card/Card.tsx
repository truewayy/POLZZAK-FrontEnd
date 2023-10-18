/* eslint-disable no-nested-ternary */
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Coupon, receiveGift } from '@/apis/coupon';
import { userInfo } from '@/apis/user';

import CardView from './CardView';

const Card = ({ reward, rewardDate, couponId }: Coupon) => {
  const { data: user } = useQuery(['userInfo'], userInfo);
  const memberType = user?.data?.memberType;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const isKid = memberType?.name === 'KID';

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
    reward,
    rewardDate: formattedDate,
    dateDiff,
    isKid,
    handleClickCard,
    handleClickReceiveButton,
    handleClickConfirmButton,
  };

  return <CardView {...CardVAProps} />;
};

export default Card;
