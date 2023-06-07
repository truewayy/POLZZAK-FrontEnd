import SignUpLayout from '@/components/Layout/signUpLayout';
import ParentType from '@/components/SignUp/ParentType/ParentType';

const Parent = () => (
  <SignUpLayout
    title="보호자님에 대해 알려주세요"
    description="보호자가 도장을 찍어줄 수 있어요!"
    description2="설정한 가족관계는 뱃지로 설정돼요"
  >
    <ParentType />
  </SignUpLayout>
);

export default Parent;
