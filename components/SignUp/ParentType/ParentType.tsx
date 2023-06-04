import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Swiper from 'swiper';

import { memberType } from '@/apis/auth';
import ROUTES from '@/constants/routes';
import { signUpInfoAtom } from '@/store/userInfo';

import ParentTypeView from './ParentTypeView';

export const defaultParentTypes = [
  {
    detail: '엄마',
    memberTypeDetailId: 2,
  },
  {
    detail: '아빠',
    memberTypeDetailId: 3,
  },
  {
    detail: '언니',
    memberTypeDetailId: 4,
  },
  {
    detail: '오빠',
    memberTypeDetailId: 5,
  },
  {
    detail: '누나',
    memberTypeDetailId: 6,
  },
  {
    detail: '형',
    memberTypeDetailId: 7,
  },
  {
    detail: '할머니',
    memberTypeDetailId: 8,
  },
  {
    detail: '할아버지',
    memberTypeDetailId: 9,
  },
  {
    detail: '이모',
    memberTypeDetailId: 10,
  },
  {
    detail: '고모',
    memberTypeDetailId: 11,
  },
  {
    detail: '삼촌',
    memberTypeDetailId: 12,
  },
  {
    detail: '보호자',
    memberTypeDetailId: 13,
  },
];

const ParentType = () => {
  const { push } = useRouter();
  const [parentTypes, setParentTypes] = useState(defaultParentTypes);
  const [signUpInfo, setSignupInfo] = useRecoilState(signUpInfoAtom);
  const [currentParentType, setCurrentParentType] = useState(0);

  const buttonDisabled =
    currentParentType === 0 || signUpInfo.memberType === 'KID';

  const handleChangeSwiper: (swiper: Swiper) => void = (swiper) => {
    setSignupInfo((prev) => ({
      ...prev,
      memberTypeDetailId: parentTypes[swiper.realIndex].memberTypeDetailId,
    }));
  };

  const handleClickButton = () => {
    push(ROUTES.SIGNUP.NICKNAME);
  };

  useEffect(() => {
    const getMemberTypes = async () => {
      const { data } = await memberType();
      if ('memberTypeDetailList' in data) {
        const parentTypeList = data.memberTypeDetailList.filter(
          ({ memberTypeDetailId }) => memberTypeDetailId !== 1
        );
        setParentTypes(parentTypeList);
      }
    };
    getMemberTypes();
  }, []);

  useEffect(() => {
    setCurrentParentType(signUpInfo.memberTypeDetailId);
  }, [signUpInfo.memberTypeDetailId]);

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
