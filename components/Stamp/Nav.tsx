import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { EditFilledIcon, LeftArrow } from '@/public/icon';

const Nav = () => {
  const { back } = useRouter();

  const handleClickBack = () => {
    back();
  };

  return (
    <Flex pb="10px" w="100%" justify="space-between" align="center">
      <LeftArrow w="24px" h="24px" fill="gray.700" onClick={handleClickBack} />
      <EditFilledIcon w="24px" h="24px" />
    </Flex>
  );
};

export default Nav;
