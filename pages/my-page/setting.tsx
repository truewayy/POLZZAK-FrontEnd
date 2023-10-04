import {
  Button,
  Circle,
  Flex,
  Grid,
  Input,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Sheet from 'react-modal-sheet';
import { useQuery } from 'react-query';

import { changeNickname, changeProfile, userInfo } from '@/apis/user';
import NicknameInput from '@/components/Profile/Nickname/NicknameInput';
import {
  ImageIcon,
  LeftArrow,
  ProfileImgEditIcon,
  TrashIcon,
} from '@/public/icon';
import imgToBase64 from '@/utils/imgToBase64';

const Setting = () => {
  const methods = useForm({ mode: 'onChange' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useQuery(['userInfo'], userInfo);
  const { back } = useRouter();
  const user = data?.data;
  const nickname =
    methods.watch('nickname') === ''
      ? user?.nickname
      : methods.watch('nickname');
  const profileRef = useRef<HTMLInputElement>(null);
  const [isNicknameValidate, setIsNicknameValidate] = useState(false);
  const [profileImgChanged, setProfileImgChanged] = useState(false);
  const [profileFile, setProfileFile] = useState<FileList | null>();
  const [profileImage, setProfileImage] = useState<{
    image: File;
    url: string;
  }>();
  const isDisabled = () => {
    if (profileImgChanged && user?.nickname === nickname) return false;
    if (profileImgChanged && isNicknameValidate) return false;
    if (!profileImage && isNicknameValidate) return false;
    return true;
  };

  const handleClickProfile = () => {
    if (profileRef.current) {
      profileRef.current.click();
    }
  };

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileFile(e.target.files);
    setProfileImgChanged(true);
    onClose();
  };

  const handleDeleteProfile = () => {
    setProfileImage(undefined);
    setProfileFile(null);
    setProfileImgChanged(true);
    onClose();
  };

  const handleClickComplete = async () => {
    if (profileImage && user?.nickname === nickname) {
      const formData = new FormData();
      formData.append('profile', profileImage.image);
      const res = await changeProfile(formData);
      if (res?.status === 204) {
        return back();
      }
    }
    if (profileImage && isNicknameValidate) {
      const formData = new FormData();
      formData.append('profile', profileImage.image);
      const imgRes = await changeProfile(formData);
      const nicknameRes = await changeNickname(nickname);
      if (imgRes?.status === 204 && nicknameRes?.status === 204) {
        return back();
      }
    }
    if (!profileImage && isNicknameValidate) {
      const nicknameRes = await changeNickname(nickname);
      if (nicknameRes?.status === 204) {
        return back();
      }
    }
  };

  useEffect(() => {
    if (profileFile?.length) {
      const imgToView = async () => {
        const imgUrl = await imgToBase64(profileFile[0]);
        setProfileImage({
          image: profileFile[0],
          url: imgUrl,
        });
      };
      imgToView();
    }
  }, [profileFile]);

  // useEffect(() => {
  //   if (user?.nickname === nickname) setIsNicknameValidate(true);
  // }, [nickname, user?.nickname]);

  return (
    <VStack w="100%" minH="100vh" p="16px" pt="45px" bg="white" spacing="40px">
      <FormProvider {...methods}>
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
          zIndex="999"
        >
          <LeftArrow w="10px" h="18px" mr="auto" onClick={back} />
          <Text layerStyle="subtitle18Sbd" color="#1C1C1C">
            프로필 설정
          </Text>
          <Button
            variant="unstyled"
            layerStyle="subtitle18Sbd"
            color="polzzak.default"
            ml="auto"
            _disabled={{
              color: 'gray.300',
              cursor: 'not-allowed',
            }}
            isDisabled={isDisabled()}
            onClick={handleClickComplete}
          >
            완료
          </Button>
        </Grid>
        <Circle
          size="127px"
          bg={
            profileImage
              ? `url(${profileImage?.url})`
              : `url(${user?.profileUrl})`
          }
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
          <NicknameInput
            defaultValue={user?.nickname}
            isNicknameValidate={isNicknameValidate}
            setIsNicknameValidate={setIsNicknameValidate}
          />
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
                <Input
                  ref={profileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleChangeProfile}
                  hidden
                />
                <Text layerStyle="subtitle16Sbd">프로필 사진 변경</Text>
                <VStack w="100%" spacing="0px">
                  <Flex
                    w="100%"
                    p="12px 16px"
                    gap="8px"
                    align="center"
                    cursor="pointer"
                    onClick={handleClickProfile}
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
                    onClick={handleDeleteProfile}
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
      </FormProvider>
    </VStack>
  );
};
export default Setting;
