import { VStack } from '@chakra-ui/react';

import SEO from '@/components/Common/SEO';
import CreateForm from '@/components/CreateStampBoard/CreateForm/CreateForm';

const CreateStampBoard = () => (
  <VStack p="0 5%" spacing={0}>
    <SEO title="폴짝! | 도장판 생성" />
    <CreateForm />
  </VStack>
);

export default CreateStampBoard;
