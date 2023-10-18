import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { register } from '@/apis/auth';
import { TOKEN_KEY } from '@/constants/auth';
import ROUTES from '@/constants/routes';
import { GuardianBasicProfile, KidBasicProfile } from '@/public/icon';
import { signUpInfoAtom } from '@/store/userInfo';
import imgToBase64 from '@/utils/imgToBase64';
import { setLocalStorage } from '@/utils/storage';

import ProfileImageView from './ProfileImageView';

const ProfileImage = () => {
  const { push } = useRouter();
  const { username, socialType, nickname, memberType, memberTypeDetailId } =
    useRecoilValue(signUpInfoAtom);
  const [userType, setUserType] = useState<string>('');
  const profileRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profileFile, setProfileFile] = useState<FileList | null>();
  const [profileImage, setProfileImage] = useState<{
    image: File;
    url: string;
  }>();

  useEffect(() => {
    setUserType(memberType);
  }, [memberType]);

  const basicProfileIcon =
    userType === 'KID' ? KidBasicProfile : GuardianBasicProfile;

  const handleClickProfile = () => {
    if (profileRef.current) {
      profileRef.current.click();
    }
  };

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileFile(e.target.files);
  };

  const handleClickButton = async () => {
    const submitData = new FormData();
    const memberInfo = {
      username,
      socialType,
      nickname,
      memberTypeDetailId,
    };
    const registerRequestBlob = new Blob([JSON.stringify(memberInfo)], {
      type: 'application/json',
    });
    submitData.append('registerRequest', registerRequestBlob);
    if (profileImage) {
      submitData.append('profile', profileImage.image);
    }
    setIsLoading(true);
    const { code, data } = await register(submitData);
    if (code === 200 && 'accessToken' in data) {
      setLocalStorage(TOKEN_KEY, data.accessToken);
      if (memberType === 'KID' || memberType === 'PARENT') {
        push(ROUTES.ON_BOARDING[memberType]);
      }
    } else {
      alert('회원가입에 실패하였습니다.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (profileFile?.length) {
      const imgToView = async () => {
        const imgUrl = await imgToBase64(profileFile[0]);
        setProfileImage({
          image: profileFile[0],
          url: imgUrl,
        });
      };
      imgToView();
    }
  }, [profileFile]);

  const ProfileImageVAProps = {
    handleClickButton,
    handleClickProfile,
    handleChangeProfile,
    profileRef,
    profileImage,
    basicProfileIcon,
    isLoading,
  };

  return <ProfileImageView {...ProfileImageVAProps} />;
};

export default ProfileImage;
