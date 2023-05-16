import { VStack } from '@chakra-ui/react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

import Header from '../Header/Header';
import InputField from '../InputField/InputField';

interface CreateFormVAProps {
  methods: UseFormReturn<FieldValues, any>;
}

const CreateFormView = ({ methods }: CreateFormVAProps) => (
  <FormProvider {...methods}>
    <Header />
    <VStack w="100%" p="60px 0 50px 0">
      <InputField />
    </VStack>
  </FormProvider>
);

export default CreateFormView;
