import { Box, Circle, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { newRequest } from '@/apis/family';
import { LinkIcon } from '@/public/icon';

const Header = () => {
  const { push } = useRouter();
  const { data } = useQuery(['newRequest'], newRequest);
  const isRequestExist =
    data?.data?.isFamilyReceived || data?.data?.isFamilySent;

  const handleClickLink = () => {
    push('/link?tab=linked');
  };

  return (
    <Flex w="100%" h="44px" p="0 5%" align="center" justify="flex-end">
      <Box pos="relative">
        <LinkIcon
          w="19px"
          h="19px"
          cursor="pointer"
          onClick={handleClickLink}
        />
        {isRequestExist && (
          <Circle
            size="5px"
            bg="error.500"
            pos="absolute"
            top="2px"
            right="-1px"
          />
        )}
      </Box>
    </Flex>
  );
};

export default Header;
