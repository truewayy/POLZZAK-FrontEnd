import { Circle, Grid, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import userInfo from '@/apis/user';
import NicknameInput from '@/components/Profile/Nickname/NicknameInput';
import { LeftArrow, ProfileImgEditIcon } from '@/public/icon';

const Setting = () => {
  const { data } = useQuery(['userInfo'], userInfo);
  const { back } = useRouter();
  const user = data?.data;
  return (
    <VStack w="100%" minH="100vh" p="16px" pt="45px" bg="white" spacing="40px">
      <Grid
        w="100%"
        maxW="560px"
        h="45px"
        templateColumns="repeat(3, 1fr)"
        placeItems="center"
        p="10px 16px"
        bg="white"
        pos="fixed"
        top="0"
      >
        <LeftArrow w="10px" h="18px" mr="auto" onClick={back} />
        <Text layerStyle="subtitle18Sbd" color="#1C1C1C">
          프로필 설정
        </Text>
        <Text layerStyle="subtitle18Sbd" color="polzzak.default" ml="auto">
          완료
        </Text>
      </Grid>
      <Circle
        size="127px"
        bg={`url(${user?.profileUrl})` ?? 'gray.200'}
        bgSize="cover"
        bgPos="center"
        pos="relative"
      >
        <ProfileImgEditIcon
          w="28px"
          h="28px"
          pos="absolute"
          bottom="0"
          right="0"
        />
      </Circle>
      <VStack w="100%" spacing="10px" pt="10px">
        <Text w="100%" layerStyle="subtitle16Sbd">
          닉네임
        </Text>
        <NicknameInput defaultValue={user?.nickname ?? ''} />
      </VStack>
    </VStack>
  );
};
export default Setting;
