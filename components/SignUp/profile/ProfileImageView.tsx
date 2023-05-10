import { Box, Input, Text, VStack } from '@chakra-ui/react';

import { BasicProfileIcon, ProfileEditIcon } from '@/public/icon';

import NextStepButton from '../Button';

interface ProfileImageVAProps {
  handleClickButton: () => void;
  handleClickProfile: () => void;
  handleChangeProfile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  profileRef: React.RefObject<HTMLInputElement>;
  profileImage:
    | {
        image: File;
        url: string;
      }
    | undefined;
}

const ProfileImageView = ({
  handleClickButton,
  handleClickProfile,
  handleChangeProfile,
  profileRef,
  profileImage,
}: ProfileImageVAProps) => (
  <VStack spacing="40px">
    <Box pos="relative">
      {profileImage ? (
        <Box
          w={127}
          h={127}
          borderRadius="50%"
          cursor="pointer"
          bg={`url(${profileImage.url}) no-repeat center/cover`}
          onClick={handleClickProfile}
        />
      ) : (
        <BasicProfileIcon
          w={127}
          h={127}
          cursor="pointer"
          onClick={handleClickProfile}
        />
      )}
      <ProfileEditIcon w={29} h={29} pos="absolute" bottom={0} right={0} />
    </Box>
    <Text fontSize="12px" color="gray.500">
      사진을 설정하지 않으면 기본 사진으로 설정돼요
    </Text>
    <Input
      type="file"
      accept="image/png"
      onChange={handleChangeProfile}
      ref={profileRef}
      hidden
    />
    <NextStepButton disabled={false} onClick={handleClickButton}>
      가입 완료
    </NextStepButton>
  </VStack>
);

export default ProfileImageView;
