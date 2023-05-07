import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Swiper from 'swiper';

import ROUTES from '@/constants/routes';
import { signUpInfoAtom } from '@/store/userInfo';

import ParentTypeView from './ParentTypeView';

const parentTypes = [
  '엄마',
  '아빠',
  '언니',
  '오빠',
  '누나',
  '형',
  '할머니',
  '할아버지',
  '이모',
  '고모',
  '삼촌',
  '보호자',
];

const ParentType = () => {
  const { push } = useRouter();
  const [signUpInfo, setSignupInfo] = useRecoilState(signUpInfoAtom);
  const [currentParentType, setCurrentParentType] = useState('');

  const buttonDisabled =
    currentParentType === '' || signUpInfo.memberType === 'child';

  const handleChangeSwiper: (swiper: Swiper) => void = (swiper) => {
    setSignupInfo((prev) => ({
      ...prev,
      parentType: parentTypes[swiper.realIndex],
    }));
  };

  const handleClickButton = () => {
    push(ROUTES.SIGNUP.NICKNAME);
  };

  useEffect(() => {
    setCurrentParentType(signUpInfo.parentType);
  }, [signUpInfo.parentType]);

  useEffect(() => {
    if (signUpInfo.memberType !== 'parent') {
      push(ROUTES.SIGNUP.NICKNAME);
    }
  }, [signUpInfo.memberType, push]);

  const ParentTypeVAProps = {
    handleChangeSwiper,
    handleClickButton,
    currentParentType,
    parentTypes,
    buttonDisabled,
  };

  return <ParentTypeView {...ParentTypeVAProps} />;
};

export default ParentType;
