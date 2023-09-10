import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { userInfoAtom } from '@/store/userInfo';

import SearchInputView from './SearchInputView';

const SearchInput = () => {
  const { pathname } = useRouter();
  const [userType, setUserType] = useState('');
  const {
    memberType: { name },
  } = useRecoilValue(userInfoAtom);
  const { push } = useRouter();

  const isPathOnboarding = pathname === '/find/family';

  const handleClickInputFrame = () => {
    if (isPathOnboarding) push('/find/family/search');
    else push('/link/search');
  };

  useEffect(() => {
    setUserType(name === 'KID' ? '보호자' : '아이');
  }, [name]);

  const SearchInputViewVAProps = {
    userType,
    isPathOnboarding,
    handleClickInputFrame,
  };

  return <SearchInputView {...SearchInputViewVAProps} />;
};

export default SearchInput;
