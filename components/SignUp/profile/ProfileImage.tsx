import { useRecoilValue } from 'recoil';

import { register } from '@/apis/auth';
import { signUpInfoAtom } from '@/store/userInfo';

import ProfileImageView from './ProfileImageView';

const ProfileImage = () => {
  const signUpInfo = useRecoilValue(signUpInfoAtom);

  // const [profileImage, setProfileImage] = useState(undefined);

  const handleClickButton = async () => {
    const submitData = new FormData();
    submitData.append('username', signUpInfo.username);
    submitData.append('socialType', signUpInfo.socialType);
    submitData.append('nickname', signUpInfo.nickname);

    if (signUpInfo.memberType === 'child') {
      submitData.append('memberType', signUpInfo.memberType);
    } else {
      submitData.append('memberType', signUpInfo.parentType);
    }
    const { code } = await register(submitData);
    if (code === 200) {
      alert('회원가입이 완료되었습니다.');
    } else {
      alert('회원가입에 실패하였습니다.');
    }
  };

  const ProfileImageVAProps = {
    handleClickButton,
  };

  return <ProfileImageView {...ProfileImageVAProps} />;
};

export default ProfileImage;
