import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import { duplicateCheck } from '@/apis/auth';
import ROUTES from '@/constants/routes';
import { signUpInfoAtom } from '@/store/userInfo';

import NicknameInputView from './NicknameInputView';

const NicknameInput = () => {
  const { push } = useRouter();
  const setSignUpInfo = useSetRecoilState(signUpInfoAtom);
  const [isNicknameValidate, setIsNicknameValidate] = useState(false);
  const {
    register,
    formState: { isValid, errors },
    watch,
  } = useForm({ mode: 'onChange' });

  const nickname = watch('nickname');
  const duplicateButtonDisabled = !isValid || isNicknameValidate;
  const buttonDisabled = !isValid || !isNicknameValidate;
  const inputLength = nickname?.length || 0;
  const isNicknameError = !!errors.nickname;
  const errorMsg = errors.nickname?.message;

  const handleClickDuplicateButton = async () => {
    const status = await duplicateCheck(nickname);
    setIsNicknameValidate(status === 204);
  };

  const handleClickButton = () => {
    setSignUpInfo((prev) => ({ ...prev, nickname }));
    push(ROUTES.SIGNUP.PROFILE);
  };

  const validateNickname = {
    required: '닉네임을 입력해주세요.',
    minLength: {
      value: 2,
      message: '최소 2글자 이상 입력해주세요',
    },
    maxLength: {
      value: 10,
      message: '최대 10글자까지 입력 가능해요',
    },
    pattern: {
      value: /^[a-zA-Z0-9가-힣]*$/,
      message: '특수문자 제외 후 입력해주세요',
    },
  };

  useEffect(() => {
    setIsNicknameValidate(false);
  }, [nickname]);

  useEffect(() => {
    setSignUpInfo((prev) => ({ ...prev, nickname: '' }));
  }, [setSignUpInfo]);

  const NicknameInputVAProps = {
    register,
    handleClickDuplicateButton,
    handleClickButton,
    validateNickname,
    inputLength,
    isNicknameValidate,
    isNicknameError,
    errorMsg,
    duplicateButtonDisabled,
    buttonDisabled,
  };

  return <NicknameInputView {...NicknameInputVAProps} />;
};

export default NicknameInput;
