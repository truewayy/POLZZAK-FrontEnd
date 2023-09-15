import {
  Button,
  Circle,
  Flex,
  Grid,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Sheet from 'react-modal-sheet';
import { useQuery } from 'react-query';

import userInfo from '@/apis/user';
import NicknameInput from '@/components/Profile/Nickname/NicknameInput';
import {
  ImageIcon,
  LeftArrow,
  ProfileImgEditIcon,
  TrashIcon,
} from '@/public/icon';

const Setting = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          cursor="pointer"
          onClick={onOpen}
        />
      </Circle>
      <VStack w="100%" spacing="10px" pt="10px">
        <Text w="100%" layerStyle="subtitle16Sbd">
          닉네임
        </Text>
        <NicknameInput defaultValue={user?.nickname ?? ''} />
      </VStack>
      <Sheet
        isOpen={isOpen}
        onClose={onClose}
        snapPoints={[450, 350, 200, 0]}
        initialSnap={0}
        style={{
          maxWidth: '560px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <VStack
              w="100%"
              h={400}
              bg="white"
              p="16px"
              pt="0"
              spacing="24px"
              pos="relative"
            >
              <Text layerStyle="subtitle16Sbd">프로필 사진 변경</Text>
              <VStack w="100%" spacing="0px">
                <Flex
                  w="100%"
                  p="12px 16px"
                  gap="8px"
                  align="center"
                  cursor="pointer"
                >
                  <ImageIcon w="24px" h="24px" />
                  <Text layerStyle="body15Md">내 사진첩에서 선택</Text>
                </Flex>
                <Flex
                  w="100%"
                  p="12px 16px"
                  gap="8px"
                  align="center"
                  cursor="pointer"
                >
                  <TrashIcon w="24px" h="24px" />
                  <Text layerStyle="body15Md" color="error.500">
                    현재 사진 삭제
                  </Text>
                </Flex>
              </VStack>
              <Button
                w="90%"
                h="auto"
                p="14px 0"
                layerStyle="subtitle16Sbd"
                bgColor="polzzak.default"
                color="white"
                pos="absolute"
                bottom="20px"
                borderRadius="8px"
                onClick={onClose}
              >
                닫기
              </Button>
            </VStack>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop
          onTap={onClose}
          style={{ background: 'rgba(0, 0, 0, 0.4)' }}
        />
      </Sheet>
    </VStack>
  );
};
export default Setting;
