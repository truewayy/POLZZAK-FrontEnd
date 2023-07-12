import SignUpLayout from '@/components/Layout/signUpLayout';
import MemberType from '@/components/SignUp/MemberType/MemberType';

const Type = () => (
  <SignUpLayout
    title="어떤 회원으로 활동하시겠어요?"
    description="나중에 변경이 불가하니 신중하게 선택해 주세요"
  >
    <MemberType />
  </SignUpLayout>
);

export default Type;
