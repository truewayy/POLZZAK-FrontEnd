import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from 'react-hook-form';

import { Check, EditFilledIcon } from '@/public/icon';

interface NicknameInputVAProps {
  register: UseFormRegister<FieldValues>;
  handleClickDuplicateButton: () => void;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
  defaultValue: string | undefined;
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
  isInputFocused: boolean;
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
}: NicknameInputVAProps) => (
  <VStack w="100%" spacing="10px">
    <Flex pos="relative" w="100%" h="50px" gap="7px">
      <Box w="100%" pos="relative">
        <Input
          bg="white"
          h="100%"
          p="0 16px"
          variant="unstyled"
          outline="none"
          border="1px solid"
          borderColor={isNicknameError ? '#FF6161' : 'gray.300'}
          layerStyle="body14Md"
          fontSize="14px"
          placeholder="닉네임을 입력해주세요"
          maxLength={10}
          _placeholder={{ color: 'gray.300' }}
          _focus={{
            outline: 'none',
            border: '1px solid',
            borderColor: isNicknameError ? '#FF6161' : 'polzzak.default',
          }}
          {...register('nickname', validateNickname)}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {!isInputFocused && (
          <EditFilledIcon
            pos="absolute"
            right="13px"
            top="50%"
            transform="translateY(-50%)"
            w="24px"
            h="24px"
            fill="gray.300"
          />
        )}
        {isInputFocused && (
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
        )}
      </Box>

      {(isInputFocused || inputLength !== 0) && (
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
      )}
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
      {isNicknameValidate === true && (
        <Text
          pos="absolute"
          bottom="-25px"
          left="5px"
          layerStyle="caption12Sbd"
          color="blue.600"
        >
          <Check /> 사용 가능한 닉네임이에요
        </Text>
      )}
    </Flex>
  </VStack>
);

export default NicknameInputView;
