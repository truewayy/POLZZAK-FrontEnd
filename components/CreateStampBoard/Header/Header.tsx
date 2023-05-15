import { useRouter } from 'next/router';

import HeaderView from './HeaderView';

const Header = () => {
  const { back } = useRouter();

  const handleClickBack = () => {
    back();
  };

  const handleClickRegister = () => {
    console.log('등록');
  };

  const HeaderVAProps = {
    handleClickBack,
    handleClickRegister,
  };

  return <HeaderView {...HeaderVAProps} />;
};

export default Header;
