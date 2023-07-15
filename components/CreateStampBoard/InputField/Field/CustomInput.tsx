/* eslint-disable react/no-children-prop */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
import { Box, Flex, Input, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { InputDeleteIcon } from '@/public/icon';

interface InputProps extends UseControllerProps {
  w?: string | number;
  h: string | number;
  maxLength: number;
  placeholder?: string;
}

const CustomInput = ({
  w = '100%',
  h,
  maxLength,
  placeholder,
  ...props
}: InputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);
  const [focusOn, setFocusOn] = useState(false);

  const valueLength = field.value?.length || 0;
  const isNotEmpty = field.value?.length > 0;
  const isError = !!error;
  const errorMsg = error?.message;

  const handleFocusOn = () => {
    setFocusOn(true);
  };

  const handleFocusOff = () => {
    setFocusOn(false);
  };

  const handleClickDelete = () => {
    field.onChange('');
  };

  return (
    <VStack w={w} spacing="4px">
      <Box
        w="100%"
        pos="relative"
        onFocus={handleFocusOn}
        onBlur={handleFocusOff}
      >
        <Input
          variant="unstyled"
          h={h}
          p="0 16px"
          border="1px solid"
          borderColor={
            isError ? 'error.500' : isNotEmpty ? 'gray.400' : 'gray.200'
          }
          placeholder={placeholder}
          maxLength={maxLength}
          _placeholder={{
            layerStyle: 'body14Md',
            color: 'gray.400',
          }}
          _focus={{
            border: '1px solid',
            borderColor: isError ? 'error.500' : 'polzzak.default',
          }}
          {...field}
          onChange={(event) => {
            field.onChange(event.target.value); // data send back to hook form
          }}
        />
        {isNotEmpty && (
          <InputDeleteIcon
            w="16px"
            h="16px"
            pos="absolute"
            cursor="pointer"
            top="50%"
            right="16px"
            transform="translateY(-50%)"
            onClick={handleClickDelete}
          />
        )}
      </Box>

      <Flex w="100%">
        {isError && (
          <Text layerStyle="caption12Sbd" color="error.500">
            {errorMsg as React.ReactNode}
          </Text>
        )}
        {focusOn && (
          <Text layerStyle="caption12Md" color="gray.500" ml="auto">
            {valueLength}/{maxLength}
          </Text>
        )}
      </Flex>
    </VStack>
  );
};

export default CustomInput;
