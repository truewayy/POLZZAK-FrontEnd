import { VStack } from '@chakra-ui/react';

import SEO from '@/components/Common/SEO';
import Header from '@/components/CreateStampBoard/Header/Header';

const CreateStampBoard = () => (
  <VStack p="0 5%">
    <SEO title="폴짝! | 도장판 생성" />
    <Header />
  </VStack>
);

export default CreateStampBoard;
