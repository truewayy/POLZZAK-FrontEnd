import { useRouter } from 'next/router';

import ROUTES from '@/constants/routes';

import AddButtonView from './AddButtonView';

const AddButton = () => {
  const { push } = useRouter();

  const handleClickButton = () => {
    push(ROUTES.CREATE_STAMPBOARD);
  };

  const AddButtonVAProps = {
    handleClickButton,
  };

  return <AddButtonView {...AddButtonVAProps} />;
};

export default AddButton;
