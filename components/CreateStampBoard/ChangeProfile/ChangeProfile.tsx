import useControlFilter from '@/hooks/useControlFilter';

import ChangeProfileView from './ChangeProfileView';

const ChangeProfile = () => {
  const { currentValue, handleClickFilter } = useControlFilter();

  const balloonMessage =
    currentValue === '전체'
      ? '도장판을 누구에게 만들어줄까요?'
      : '칭찬 도장이 필요해요!';

  const ChangeProfileVAProps = {
    handleClickFilter,
    currentValue: currentValue === '전체' ? '아이 선택' : currentValue,
    balloonMessage,
  };

  return <ChangeProfileView {...ChangeProfileVAProps} />;
};

export default ChangeProfile;
