import { Box, Text, VStack } from '@chakra-ui/react';

import { BasicProfileIcon, ProfileEditIcon } from '@/public/icon';

import NextStepButton from '../Button';

interface ProfileImageVAProps {
  handleClickButton: () => void;
}

const ProfileImageView = ({ handleClickButton }: ProfileImageVAProps) => (
  <VStack spacing="40px">
    <Box pos="relative">
      <BasicProfileIcon w={127} h={127} />
      <ProfileEditIcon w={29} h={29} pos="absolute" bottom={0} right={0} />
    </Box>
    <Text fontSize="12px" color="gray.500">
      사진을 설정하지 않으면 기본 사진으로 설정돼요
    </Text>
    <NextStepButton disabled={false} onClick={handleClickButton}>
      가입 완료
    </NextStepButton>
  </VStack>
);

export default ProfileImageView;
