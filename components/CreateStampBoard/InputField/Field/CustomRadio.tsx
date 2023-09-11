/* eslint-disable react/require-default-props */
import { FormLabel, Grid, Text, VStack } from '@chakra-ui/react';
import { useController, UseControllerProps } from 'react-hook-form';

interface RadioProps extends UseControllerProps {
  w?: string | number;
  options: number[];
}

const CustomRadio = ({ w = '100%', options, ...props }: RadioProps) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(Number(event.target.value));
  };
  const isError = !!error;
  const errorMsg = error?.message;

  return (
    <VStack w={w} spacing="4px">
      <Grid
        w="100%"
        p="20px 10px"
        templateColumns="repeat(5, 1fr)"
        rowGap="16px"
        columnGap="6px"
        border="1px solid"
        borderColor={isError ? 'error.500' : 'gray.200'}
        borderRadius="12px"
      >
        {options.map((option) => (
          <FormLabel
            key={option}
            htmlFor={`option${option}`}
            w="100%"
            p="8px 0"
            m={0}
            textAlign="center"
            border="1px solid"
            borderRadius="8px"
            borderColor={
              field.value === option ? 'polzzak.default' : 'gray.300'
            }
            bg={field.value === option ? 'blue.100' : 'white'}
            cursor="pointer"
          >
            <input
              type="radio"
              id={`option${option}`}
              {...field}
              hidden
              value={String(option)}
              checked={field.value === option}
              onChange={handleChange}
            />
            <Text
              layerStyle="subtitle16Md"
              color={field.value === option ? 'blue.600' : 'gray.400'}
            >
              {option}
            </Text>
          </FormLabel>
        ))}
      </Grid>
      {isError && (
        <Text w="100%" layerStyle="caption12Sbd" color="error.500">
          {errorMsg as React.ReactNode}
        </Text>
      )}
    </VStack>
  );
};

export default CustomRadio;
