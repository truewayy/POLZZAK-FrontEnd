import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import ROUTES from '@/constants/routes';
import { userInfoAtom } from '@/store/userInfo';

import AddButtonView from './AddButtonView';

const AddButton = () => {
  const { type } = useRecoilValue(userInfoAtom);
  const { push } = useRouter();

  const isTypeParent = type !== 'KID';

  const handleClickButton = () => {
    push(ROUTES.CREATE_STAMPBOARD);
  };

  const AddButtonVAProps = {
    handleClickButton,
  };

  return isTypeParent ? <AddButtonView {...AddButtonVAProps} /> : null;
};

export default AddButton;
