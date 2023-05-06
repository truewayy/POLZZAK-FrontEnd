import { useRouter } from 'next/router';

import HeaderView from './HeaderView';

const Header = () => {
  const { push } = useRouter();

  const goBack = () => {
    push('/');
  };

  const HeaderVAProps = {
    goBack,
  };

  return <HeaderView {...HeaderVAProps} />;
};

export default Header;
