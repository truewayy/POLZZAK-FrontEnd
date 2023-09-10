import SignUpLayout from '@/components/Layout/signUpLayout';
import ParentType from '@/components/SignUp/ParentType/ParentType';

const Parent = () => (
  <SignUpLayout
    title="함께 활동할 아이와의"
    title2="가족관계를 알려주세요"
    description="설정한 가족관계는 뱃지로 설정돼요"
    description2="나중에 변경이 불가하니 신중하게 선택해주세요"
  >
    <ParentType />
  </SignUpLayout>
);

export default Parent;
