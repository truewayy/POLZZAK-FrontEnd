import {
  Box,
  ComponentWithAs,
  Icon,
  IconProps,
  Input,
  VStack,
} from '@chakra-ui/react';

import { ProfileEditIcon } from '@/public/icon';

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
  basicProfileIcon: ComponentWithAs<'svg', IconProps>;
}

const ProfileImageView = ({
  handleClickButton,
  handleClickProfile,
  handleChangeProfile,
  profileRef,
  profileImage,
  basicProfileIcon,
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
        <Icon
          as={basicProfileIcon}
          w={127}
          h={127}
          cursor="pointer"
          onClick={handleClickProfile}
        />
      )}
      <ProfileEditIcon w={29} h={29} pos="absolute" bottom={0} right={0} />
    </Box>
    <Input
      type="file"
      accept="image/png"
      onChange={handleChangeProfile}
      ref={profileRef}
      hidden
    />
    <NextStepButton disabled={false} onClick={handleClickButton}>
      회원가입 완료
    </NextStepButton>
  </VStack>
);

export default ProfileImageView;
