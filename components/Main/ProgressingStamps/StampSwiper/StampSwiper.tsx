import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import Swiper from 'swiper';

import { StampboardListData } from '@/apis/stamp';
import { userInfoAtom } from '@/store/userInfo';

import StampSwiperView from './StampSwiperView';

const StampSwiper = ({
  partner: { nickname },
  stampBoardSummaries,
}: StampboardListData) => {
  const { families, memberType } = useRecoilValue(userInfoAtom);
  const [currentBoard, setCurrentBoard] = useState<number>(1);
  const totalBoard = stampBoardSummaries.length;
  const progressingBoard = stampBoardSummaries;

  const isKid = memberType.name === 'KID';

  const currentFilterMemberType =
    families.find((family) => family.nickname === nickname)?.memberType
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
