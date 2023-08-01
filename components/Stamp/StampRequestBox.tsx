import { Flex } from '@chakra-ui/react';

import { Notifications } from '@/public/icon';

const StampRequestBox = () => (
  <Flex w="100%" pb="10px">
    <Flex
      w="100%"
      p="12px 16px"
      align="center"
      bg="#F0F7FF"
      layerStyle="body14Sbd"
      color="polzzak.highlighted"
      border="1px solid rgba(13, 122, 211, 0.16)"
      borderRadius="8px"
      gap="8px"
    >
      <Notifications w="20px" h="20px" /> 도장 요청이 있어요!
    </Flex>
  </Flex>
);

export default StampRequestBox;
