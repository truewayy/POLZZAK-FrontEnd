import { useQuery } from 'react-query';

import { familiesInfo } from '@/apis/family';
import useControlFilter from '@/hooks/useControlFilter';

import BottomSheetModalView from './BottomSheetModalView';

const BottomSheetModal = () => {
  const { handleClickFilter, handleChangeFilter, filterOn, currentValue } =
    useControlFilter();
  const { data } = useQuery(['families'], familiesInfo);
  const families = data?.data?.families;

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
