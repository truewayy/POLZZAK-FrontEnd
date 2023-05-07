import { useRouter } from 'next/router';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import ROUTES from '@/constants/routes';
import { signUpInfoAtom } from '@/store/userInfo';

import MemberTypeView from './MemberTypeView';

const MemberType = () => {
  const { push } = useRouter();
  const [signUpInfo, setSignupInfo] = useRecoilState(signUpInfoAtom);
  const [memberType, setMemberType] = useState('');

  const buttonDisabled = memberType === '';

  const handleChangeMemberType: MouseEventHandler<HTMLDivElement> = (e) => {
    setSignupInfo((prev) => ({ ...prev, memberType: e.currentTarget.id }));
  };

  const handleClickButton = () => {
    if (memberType === 'child') {
      return push(ROUTES.SIGNUP.NICKNAME);
    }
    return push(ROUTES.SIGNUP.PARENT);
  };

  useEffect(() => {
    setMemberType(signUpInfo.memberType);
  }, [signUpInfo.memberType]);

  const MemberTypeVAProps = {
    memberType,
    buttonDisabled,
    handleChangeMemberType,
    handleClickButton,
  };

  return <MemberTypeView {...MemberTypeVAProps} />;
};

export default MemberType;
