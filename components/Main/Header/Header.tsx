import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { LinkIcon } from '@/public/icon';

const Header = () => {
  const { push } = useRouter();

  const handleClickLink = () => {
    push('/link');
  };

  return (
    <Flex w="100%" h="44px" p="0 5%" align="center" justify="flex-end">
      <LinkIcon w={19} h={19} cursor="pointer" onClick={handleClickLink} />
    </Flex>
  );
};

export default Header;
