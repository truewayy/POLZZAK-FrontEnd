import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { userInfo } from '@/apis/user';

import SearchInputView from './SearchInputView';

const SearchInput = () => {
  const { pathname } = useRouter();
  const [userType, setUserType] = useState('');
  const { data: user } = useQuery(['userInfo'], userInfo);
  const name = user?.data?.memberType.name;

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
