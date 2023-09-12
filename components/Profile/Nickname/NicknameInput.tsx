import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { duplicateCheck } from '@/apis/auth';

import NicknameInputView from './NicknameInputView';

const NicknameInput = ({ defaultValue }: { defaultValue: string }) => {
  const [isNicknameValidate, setIsNicknameValidate] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const {
    register,
    watch,
    setError,
    formState: { isValid, errors },
  } = useForm({ mode: 'onChange' });

  const nickname = watch('nickname');
  const duplicateButtonDisabled = !isValid || isNicknameValidate;
  const buttonDisabled = !isValid || !isNicknameValidate;
  const inputLength = nickname?.length || 0;
  const isNicknameError = !!errors.nickname;
  const errorMsg = errors.nickname?.message;
  const validateNickname = {
    required: '최소 2글자로 설정해주세요',
    minLength: {
      value: 2,
      message: '최소 2글자로 설정해주세요',
    },
    maxLength: {
      value: 10,
      message: '10자까지만 쓸 수 있어요',
    },
    pattern: {
      value: /^[a-zA-Z0-9가-힣]*$/,
      message: '특수문자(공백)는 쓸 수 없어요',
    },
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleClickDuplicateButton = async () => {
    const status = await duplicateCheck(nickname);
    if (status === 400) {
      setError('nickname', {
        type: 'manual',
        message: '이미 사용 중인 닉네임이에요',
      });
    } else if (status === 204) {
      setIsNicknameValidate(true);
    }
  };

  useEffect(() => {
    setIsNicknameValidate(false);
  }, [nickname]);

  const NicknameInputVAProps = {
    register,
    handleClickDuplicateButton,
    handleInputFocus,
    handleInputBlur,
    defaultValue,
    validateNickname,
    inputLength,
    isInputFocused,
    isNicknameValidate,
    isNicknameError,
    errorMsg,
    duplicateButtonDisabled,
    buttonDisabled,
  };

  return <NicknameInputView {...NicknameInputVAProps} />;
};

export default NicknameInput;
