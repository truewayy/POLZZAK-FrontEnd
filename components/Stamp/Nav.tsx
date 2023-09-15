import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { EditFilledIcon, LeftArrow } from '@/public/icon';

const Nav = () => {
  const { back, push, query } = useRouter();
  const stampboardId = query.stampboardId as string;

  const handleClickBack = () => {
    back();
  };

  const handleClickEdit = () => {
    push(`/stamp-board/${stampboardId}/edit`);
  };

  return (
    <Flex pb="10px" w="100%" justify="space-between" align="center">
      <LeftArrow w="24px" h="24px" fill="gray.700" onClick={handleClickBack} />
      <EditFilledIcon
        w="24px"
        h="24px"
        fill="#45464F"
        onClick={handleClickEdit}
      />
    </Flex>
  );
};

export default Nav;
