import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { familiesInfo } from '@/apis/family';
import useControlFilter from '@/hooks/useControlMainFilter';

import BottomSheetModalView from './BottomSheetModalView';

const BottomSheetModal = () => {
  const {
    handleClickClose,
    handleClickOpen,
    handleChangeFilter,
    filterOn,
    currentValue,
  } = useControlFilter();
  const [selectedProfile, setSelectedProfile] = useState<string>(currentValue);

  const { data, isLoading } = useQuery(['families'], familiesInfo, {
    refetchOnWindowFocus: false,
  });

  const families = data?.data?.families;

  const handleClickProfile = (profile: string) => {
    setSelectedProfile(profile);
  };

  useEffect(() => {
    if (currentValue === '전체') handleClickOpen();
  }, [currentValue, handleClickOpen]);

  const BottomSheetModalVAProps = {
    onClose: handleClickClose,
    handleChangeFilter,
    handleClickProfile,
    filterOn,
    selectedProfile,
    families,
    isLoading,
  };

  return <BottomSheetModalView {...BottomSheetModalVAProps} />;
};

export default BottomSheetModal;
