import { VStack } from '@chakra-ui/react';

import Header from '@/components/SignUp/Header/Header';
import MemberType from '@/components/SignUp/MemberType/MemberType';

const Type = () => (
  <VStack pos="relative" minH="100vh" p="0 5%" bg="gray.100">
    <Header />
    <MemberType />
  </VStack>
);

export default Type;
