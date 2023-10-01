import { useState } from 'react';
import { useQuery } from 'react-query';
import Swiper from 'swiper';

import { familiesInfo } from '@/apis/family';
import { StampboardListData } from '@/apis/stamp';
import { userInfo } from '@/apis/user';

import StampSwiperView from './StampSwiperView';

const StampSwiper = ({
  partner: { nickname },
  stampBoardSummaries,
}: StampboardListData) => {
  const { data: user } = useQuery(['userInfo'], userInfo);
  const memberType = user?.data?.memberType;
  const { data: my } = useQuery(['families'], familiesInfo);
  const families = my?.data?.families;

  const [currentBoard, setCurrentBoard] = useState<number>(1);
  const totalBoard = stampBoardSummaries.length;
  const progressingBoard = stampBoardSummaries;

  const isKid = memberType?.name === 'KID';

  const currentFilterMemberType =
    families?.find((family) => family.nickname === nickname)?.memberType
      .detail || '';

  const handleChangeSwiper: (swiper: Swiper) => void = (swiper) => {
    setCurrentBoard(swiper.activeIndex + 1);
  };

  const StampSwiperVAProps = {
    handleChangeSwiper,
    isKid,
    currentFilterMemberType,
    nickname,
    currentBoard,
    totalBoard,
    progressingBoard,
  };

  return <StampSwiperView {...StampSwiperVAProps} />;
};

export default StampSwiper;
