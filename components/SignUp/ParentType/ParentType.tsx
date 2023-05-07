import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Swiper from 'swiper';

import ROUTES from '@/constants/routes';
import { signUpInfoAtom } from '@/store/userInfo';

import ParentTypeView from './ParentTypeView';

const parentTypes = [
  {
    name: '엄마',
    value: 'MOTHER',
  },
  {
    name: '아빠',
    value: 'FATHER',
  },
  {
    name: '언니',
    value: 'FEMALE_SISTER',
  },
  {
    name: '오빠',
    value: 'FEMALE_BROTHER',
  },
  {
    name: '누나',
    value: 'MALE_SISTER',
  },
  {
    name: '형',
    value: 'MALE_BROTHER',
  },
  {
    name: '할머니',
    value: 'GRANDMOTHER',
  },
  {
    name: '할아버지',
    value: 'GRANDFATHER',
  },
  {
    name: '이모',
    value: 'MATERNAL_AUNT',
  },
  {
    name: '고모',
    value: 'PATERNAL_AUNT',
  },
  {
    name: '삼촌',
    value: 'UNCLE',
  },
  {
    name: '보호자',
    value: 'ETC',
  },
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
      parentType: parentTypes[swiper.realIndex].value,
    }));
  };

  const handleClickButton = () => {
    push(ROUTES.SIGNUP.NICKNAME);
  };

  useEffect(() => {
    setCurrentParentType(signUpInfo.parentType);
  }, [signUpInfo.parentType]);

  useEffect(() => {
    if (signUpInfo.memberType !== 'PARENT') {
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
