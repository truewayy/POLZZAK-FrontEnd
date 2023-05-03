import { useRecoilState } from 'recoil';

import { filterAtom, filterModalAtom } from '@/store/filter';

const useControlFilter = () => {
  const [filterOn, setFilterOn] = useRecoilState(filterModalAtom);
  const [currentValue, setCurrentValue] = useRecoilState(filterAtom);

  const handleClickFilter = () => {
    setFilterOn(!filterOn);
  };

  const handleChangeFilter = (nickname: string) => {
    setCurrentValue(nickname);
    setFilterOn(!filterOn);
  };

  return {
    filterOn,
    currentValue,
    handleClickFilter,
    handleChangeFilter,
  };
};

export default useControlFilter;
