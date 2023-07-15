import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from 'react-hook-form';

import { Check } from '@/public/icon';

import NextStepButton from '../Button';

interface NicknameInputVAProps {
  register: UseFormRegister<FieldValues>;
  handleClickButton: () => void;
  handleClickDuplicateButton: () => void;
  validateNickname: {
    required: string;
    minLength: {
      value: number;
      message: string;
    };
    maxLength: {
      value: number;
      message: string;
    };
    pattern: {
      value: RegExp;
      message: string;
    };
  };
  inputLength: number;
  isNicknameValidate: boolean;
  isNicknameError: boolean;
  errorMsg:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  duplicateButtonDisabled: boolean;
  buttonDisabled: boolean;
}

const NicknameInputView = ({
  register,
  handleClickButton,
  handleClickDuplicateButton,
  validateNickname,
  inputLength,
  isNicknameValidate,
  isNicknameError,
  errorMsg,
  duplicateButtonDisabled,
  buttonDisabled,
}: NicknameInputVAProps) => (
  <VStack w="100%" spacing="10px">
    <Text layerStyle="body13Md" alignSelf="flex-start" color="gray.500">
      한글, 영문(대소문자 구별), 숫자 사용 가능 / 특수 문자, 공백 불가
    </Text>
    <Flex pos="relative" w="100%" h="50px" gap="7px">
      <Box w="100%" pos="relative">
        <Input
          bg="white"
          h="100%"
          variant="outline"
          borderColor="gray.300"
          layerStyle="body14Md"
          fontSize="14px"
          placeholder="닉네임을 입력해주세요"
          maxLength={10}
          _placeholder={{ color: 'gray.300' }}
          {...register('nickname', validateNickname)}
        />
        <Text
          pos="absolute"
          bottom="-23px"
          right="10px"
          fontSize="12px"
          color="gray.500"
          {...(inputLength > 10 && { color: '#FF6161' })}
        >
          {inputLength || 0}/10
        </Text>
      </Box>

      <Button
        bg="polzzak.default"
        h="100%"
        layerStyle="subtitle16Md"
        fontWeight="500"
        color="white"
        borderRadius="8px"
        pos="relative"
        isDisabled={duplicateButtonDisabled}
        _hover={{ bg: 'polzzak.default' }}
        _disabled={{
          bg: isNicknameValidate ? 'blue.200' : 'gray.300',
          cursor: 'not-allowed',
        }}
        onClick={handleClickDuplicateButton}
      >
        {!isNicknameValidate ? '중복 확인' : '사용 가능'}
      </Button>
      {isNicknameError && (
        <Text
          pos="absolute"
          bottom="-25px"
          left="5px"
          layerStyle="body13Md"
          color="#FF6161"
        >
          {errorMsg as React.ReactNode}
        </Text>
      )}
      {isNicknameValidate && (
        <Text
          pos="absolute"
          bottom="-25px"
          left="5px"
          layerStyle="caption12Sbd"
          color="blue.600"
        >
          <Check /> 사용가능한 닉네임이에요
        </Text>
      )}
    </Flex>
    <NextStepButton disabled={buttonDisabled} onClick={handleClickButton}>
      다음
    </NextStepButton>
  </VStack>
);

export default NicknameInputView;
