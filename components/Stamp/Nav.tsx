import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { userInfo } from '@/apis/user';
import { EditFilledIcon, LeftArrow } from '@/public/icon';

const Nav = ({ isCompleted }: { isCompleted: boolean }) => {
  const { data: user } = useQuery(['userInfo'], userInfo);
  const { back, push, query } = useRouter();
  const stampboardId = query.stampboardId as string;
  const memberType = user?.data?.memberType;
  const isKid = memberType?.name === 'KID';

  const handleClickBack = () => {
    back();
  };

  const handleClickEdit = () => {
    push(`/stamp-board/${stampboardId}/edit`);
  };

  return (
    <Flex pb="10px" w="100%" justify="space-between" align="center">
      <LeftArrow w="24px" h="24px" fill="gray.700" onClick={handleClickBack} />
      {!isKid && !isCompleted && (
        <EditFilledIcon
          w="24px"
          h="24px"
          fill="#45464F"
          onClick={handleClickEdit}
        />
      )}
    </Flex>
  );
};

export default Nav;
