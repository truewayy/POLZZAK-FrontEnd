import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { userInfoAtom } from '@/store/userInfo';

import SearchInputView from './SearchInputView';

const SearchInput = () => {
  const [userType, setUserType] = useState('');
  const {
    memberType: { name },
  } = useRecoilValue(userInfoAtom);
  const { push } = useRouter();

  const handleClickInputFrame = () => {
    push('/link/search');
  };

  useEffect(() => {
    setUserType(name === 'KID' ? '보호자' : '아이');
  }, [name]);

  const SearchInputViewVAProps = {
    userType,
    handleClickInputFrame,
  };

  return <SearchInputView {...SearchInputViewVAProps} />;
};

export default SearchInput;
