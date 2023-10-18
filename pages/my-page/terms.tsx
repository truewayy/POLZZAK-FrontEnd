import { Flex, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { LeftNavigation } from '@/public/icon';

import Terms from '../terms';

const ProfileTerms = () => {
  const { back } = useRouter();
  return (
    <VStack>
      <Flex
        pos="fixed"
        top="0"
        w="100%"
        maxW="560px"
        h="45px"
        p="10px 16px"
        justify="center"
        align="center"
        bg="white"
      >
        <LeftNavigation
          w="24px"
          h="24px"
          fill="gray.700"
          pos="absolute"
          left="16px"
          onClick={back}
        />
        <Text layerStyle="subtitle18Sbd">이용약관</Text>
      </Flex>
      <Terms />
    </VStack>
  );
};

export default ProfileTerms;
