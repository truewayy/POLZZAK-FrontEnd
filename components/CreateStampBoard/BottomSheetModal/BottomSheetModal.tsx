import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import useControlFilter from '@/hooks/useControlFilter';
import { userInfoAtom } from '@/store/userInfo';

import BottomSheetModalView from './BottomSheetModalView';

const BottomSheetModal = () => {
  const {
    handleClickClose,
    handleClickOpen,
    handleChangeFilter,
    filterOn,
    currentValue,
  } = useControlFilter();
  const { chains } = useRecoilValue(userInfoAtom);

  useEffect(() => {
    if (currentValue === '전체') handleClickOpen();
  }, [currentValue, handleClickOpen]);

  const BottomSheetModalVAProps = {
    onClose: handleClickClose,
    handleChangeFilter,
    filterOn,
    currentValue,
    chains,
  };

  return <BottomSheetModalView {...BottomSheetModalVAProps} />;
};

export default BottomSheetModal;
