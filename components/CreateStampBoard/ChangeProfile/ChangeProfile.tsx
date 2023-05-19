import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { filterAtom } from '@/store/filter';
import { userInfoAtom } from '@/store/userInfo';

import ChangeProfileView from './ChangeProfileView';

const ChangeProfile = () => {
  const filterValue = useRecoilValue(filterAtom);
  const { chains } = useRecoilValue(userInfoAtom);
  const [currentValue, setCurrentValue] = useState('');
  const [filterOn, setFilterOn] = useState(false);

  const balloonMessage =
    currentValue === '전체'
      ? '도장판을 누구에게 만들어줄까요?'
      : '칭찬 도장이 필요해요!';

  const handleClickFilter = () => {
    setFilterOn(true);
  };

  const handleChangeFilter = (nickname: string) => {
    setCurrentValue(nickname);
    setFilterOn(false);
  };

  useEffect(() => {
    setCurrentValue(filterValue);
  }, [filterValue]);

  // useEffect(() => {
  //   if (currentValue === '전체') {
  //     setFilterOn(true);
  //   }
  // }, [currentValue]);

  const ChangeProfileVAProps = {
    handleClickFilter,
    handleChangeFilter,
    chains,
    filterOn,
    currentValue: currentValue === '전체' ? '아이 선택' : currentValue,
    balloonMessage,
  };

  return <ChangeProfileView {...ChangeProfileVAProps} />;
};

export default ChangeProfile;
