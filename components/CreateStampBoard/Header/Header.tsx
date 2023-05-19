import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';

import HeaderView from './HeaderView';

const Header = () => {
  const { handleSubmit } = useFormContext();
  const { back } = useRouter();

  const handleClickBack = () => {
    back();
  };

  const handleClickRegister = (data: Object) => {
    console.log(data);
  };

  const HeaderVAProps = {
    handleClickBack,
    handleSubmit,
    handleClickRegister,
  };

  return <HeaderView {...HeaderVAProps} />;
};

export default Header;
