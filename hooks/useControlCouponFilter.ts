import { useRecoilState } from 'recoil';

import { CouponfilterAtom, filterModalAtom } from '@/store/filter';

const useControlCouponFilter = () => {
  const [filterOn, setFilterOn] = useRecoilState(filterModalAtom);
  const [currentValue, setCurrentValue] = useRecoilState(CouponfilterAtom);

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

export default useControlCouponFilter;
