import { useRecoilValue } from 'recoil';

import useControlFilter from '@/hooks/useControlFilter';
import { userInfoAtom } from '@/store/userInfo';

import BottomSheetModalView from './BottomSheetModalView';

const BottomSheetModal = () => {
  const { handleClickFilter, handleChangeFilter, filterOn, currentValue } =
    useControlFilter();
  const { families } = useRecoilValue(userInfoAtom);

  const BottomSheetModalVAProps = {
    handleClickFilter,
    handleChangeFilter,
    filterOn,
    currentValue,
    families,
  };

  return <BottomSheetModalView {...BottomSheetModalVAProps} />;
};

export default BottomSheetModal;
