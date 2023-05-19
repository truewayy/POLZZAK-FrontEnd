import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from 'react-hook-form';

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
  <VStack w="100%" spacing="32px">
    <Text layerStyle="body4" alignSelf="flex-start" color="gray.600">
      한글, 영문, 숫자 사용가능 / 특수 문자 불가
    </Text>
    <Flex pos="relative" w="100%" h="50px" gap="7px">
      <Box w="100%" pos="relative">
        <Input
          bg="white"
          h="100%"
          variant="outline"
          borderColor="gray.200"
          placeholder="인생의요정012"
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
        layerStyle="body16M"
        fontWeight="500"
        color="white"
        borderRadius="8px"
        pos="relative"
        isDisabled={duplicateButtonDisabled}
        _hover={{ bg: 'polzzak.default' }}
        onClick={handleClickDuplicateButton}
      >
        {!isNicknameValidate ? '중복확인' : '사용가능'}
      </Button>
      {isNicknameError && (
        <Text
          pos="absolute"
          bottom="-25px"
          left="5px"
          layerStyle="body4"
          color="#FF6161"
        >
          {errorMsg as React.ReactNode}
        </Text>
      )}
    </Flex>
    <NextStepButton disabled={buttonDisabled} onClick={handleClickButton}>
      다음
    </NextStepButton>
  </VStack>
);

export default NicknameInputView;
