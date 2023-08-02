import { Box, Grid, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { AlertIcon, CouponIcon, MainIcon, ProfileIcon } from '@/public/icon';

export const menus = [
  {
    name: '메인',
    path: '/main',
    icon: <MainIcon w="23px" h="23px" />,
  },
  {
    name: '쿠폰함',
    path: '/coupons',
    icon: <CouponIcon w="23px" h="23px" />,
  },
  {
    name: '알림',
    path: '/notifications',
    icon: <AlertIcon w="23px" h="23px" />,
  },
  {
    name: '마이페이지',
    path: '/profile',
    icon: <ProfileIcon w="23px" h="23px" />,
  },
];

const Menus = () => {
  const { pathname, push } = useRouter();
  const currentPath = (path: string) => pathname === path;
  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      maxW="560px"
      w="100%"
      p="8px 0"
      position="fixed"
      bottom="0"
      bg="white"
      zIndex="3"
      borderTop="1px solid"
      borderColor="gray.200"
    >
      {menus.map(({ name, path, icon }) => (
        <VStack key={name} onClick={() => push(path)} cursor="pointer">
          <Box fill={currentPath(path) ? '#59B9FF' : '#E6E4E2'}>{icon}</Box>
          <Box fontSize={12} color={currentPath(path) ? '#928E8B' : '#E6E4E2'}>
            {name}
          </Box>
        </VStack>
      ))}
    </Grid>
  );
};

export default Menus;
