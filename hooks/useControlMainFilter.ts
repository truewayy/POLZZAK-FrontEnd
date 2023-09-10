import { useRecoilState } from 'recoil';

import { filterModalAtom, MainfilterAtom } from '@/store/filter';

const useControlMainFilter = () => {
  const [filterOn, setFilterOn] = useRecoilState(filterModalAtom);
  const [currentValue, setCurrentValue] = useRecoilState(MainfilterAtom);

  const handleClickFilter = () => {
    setFilterOn(!filterOn);
  };

  const handleClickOpen = () => {
    setFilterOn(true);
  };

  const handleClickClose = () => {
    setFilterOn(false);
  };

  const handleChangeFilter = (nickname: string) => {
    setCurrentValue(nickname);
    setFilterOn(!filterOn);
  };

  return {
    filterOn,
    currentValue,
    handleClickFilter,
    handleClickOpen,
    handleClickClose,
    handleChangeFilter,
  };
};

export default useControlMainFilter;
