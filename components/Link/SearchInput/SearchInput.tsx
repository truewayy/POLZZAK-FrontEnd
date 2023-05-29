import { useRouter } from 'next/router';

import SearchInputView from './SearchInputView';

const SearchInput = () => {
  const { push } = useRouter();

  const handleClickInputFrame = () => {
    push('/link/search');
  };

  const SearchInputViewVAProps = {
    handleClickInputFrame,
  };

  return <SearchInputView {...SearchInputViewVAProps} />;
};

export default SearchInput;
