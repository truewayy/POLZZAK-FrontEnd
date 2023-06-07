import { useRecoilValue } from 'recoil';

import useControlFilter from '@/hooks/useControlFilter';
import { userInfoAtom } from '@/store/userInfo';

import LinkedFilterView from './LinkedFilterView';

const LinkedFilter = () => {
  const { families } = useRecoilValue(userInfoAtom);
  const { handleClickFilter, currentValue } = useControlFilter();

  const noFamily = families.length === 0;

  const LinkedFilterVAProps = {
    handleClickFilter,
    currentValue,
    noFamily,
  };

  return <LinkedFilterView {...LinkedFilterVAProps} />;
};

export default LinkedFilter;
