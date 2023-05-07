import { Box } from '@chakra-ui/react';

import SignUpLayout from '@/components/Layout/signUpLayout';

const Profile = () => (
  <SignUpLayout title="프로필 사진을 설정해주세요">
    <Box>사진을 설정하지 않으면 기본 사진으로 설정돼요</Box>
  </SignUpLayout>
);

export default Profile;
