/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
import { Flex, Input, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

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
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState<string>(field.value);

  const valueLength = value?.length || 0;
  const isNotEmpty = value?.length > 0;
  const isError = !!error;
  const errorMsg = error?.message;

  const handleFocusOn = () => {
    setFocus(true);
  };

  return (
    <VStack w={w} spacing="4px">
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
          layerStyle: 'body3',
          color: 'gray.400',
        }}
        _focus={{
          border: '1px solid',
          borderColor: isError ? 'error.500' : 'polzzak.default',
        }}
        onFocus={handleFocusOn}
        {...field}
        onChange={(event) => {
          field.onChange(event.target.value); // data send back to hook form
          setValue(event.target.value); // UI state
        }}
        onBlur={() => {
          field.onBlur(); // data send back to hook form
          setFocus(false); // UI state
        }}
      />
      <Flex w="100%">
        {isError && (
          <Text layerStyle="caption1" color="error.500">
            {errorMsg as React.ReactNode}
          </Text>
        )}
        {focus && (
          <Text layerStyle="caption2" color="gray.500" ml="auto">
            {valueLength}/{maxLength}
          </Text>
        )}
      </Flex>
    </VStack>
  );
};

export default CustomInput;
