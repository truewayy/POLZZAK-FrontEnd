import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import ROUTES from '@/constants/routes';
import { userInfoAtom } from '@/store/userInfo';

import AddButtonView from './AddButtonView';

const AddButton = () => {
  const { memberType, families } = useRecoilValue(userInfoAtom);
  const { push } = useRouter();

  const isTypeParent = memberType.name !== 'KID';
  const isNoFamily = families.length === 0;

  const isShow = isTypeParent && !isNoFamily;

  const handleClickButton = () => {
    push(ROUTES.CREATE_STAMPBOARD);
  };

  const AddButtonVAProps = {
    handleClickButton,
  };

  return isShow ? <AddButtonView {...AddButtonVAProps} /> : null;
};

export default AddButton;
