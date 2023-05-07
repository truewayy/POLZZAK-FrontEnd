import SignUpLayout from '@/components/Layout/signUpLayout';
import NicknameInput from '@/components/SignUp/Nickname/NicknameInput';

const Nickname = () => (
  <SignUpLayout
    title="닉네임을 설정해주세요"
    description="나중에 수정할 수 있어요"
  >
    <NicknameInput />
  </SignUpLayout>
);

export default Nickname;
