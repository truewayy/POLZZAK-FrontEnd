import { VStack } from '@chakra-ui/react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

import ChangeProfile from '../ChangeProfile/ChangeProfile';
import Header from '../Header/Header';
import InputField from '../InputField/InputField';

interface CreateFormVAProps {
  methods: UseFormReturn<FieldValues, any>;
}

const CreateFormView = ({ methods }: CreateFormVAProps) => (
  <FormProvider {...methods}>
    <VStack w="100%" p="60px 0 50px 0" spacing="33px">
      <Header />
      <ChangeProfile />
      <InputField />
    </VStack>
  </FormProvider>
);

export default CreateFormView;
