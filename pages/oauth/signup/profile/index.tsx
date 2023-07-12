import SignUpLayout from '@/components/Layout/signUpLayout';
import ProfileImage from '@/components/SignUp/profile/ProfileImage';

const Profile = () => (
  <SignUpLayout
    title="프로필 사진을 설정해주세요"
    description="나중에 설정해도 괜찮아요"
    description2="미설정 시 기본 사진으로 설정돼요"
  >
    <ProfileImage />
  </SignUpLayout>
);

export default Profile;
