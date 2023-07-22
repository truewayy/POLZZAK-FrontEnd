import { useQuery } from 'react-query';

import { familiesInfo } from '@/apis/family';
import useControlFilter from '@/hooks/useControlFilter';

import ChangeProfileView from './ChangeProfileView';

const ChangeProfile = () => {
  const { data } = useQuery(['families'], familiesInfo, {
    refetchOnWindowFocus: false,
  });
  const { currentValue, handleClickFilter } = useControlFilter();

  const profileUrl = data?.data?.families?.find(
    (family) => family.nickname === currentValue
  )?.profileUrl;

  const ChangeProfileVAProps = {
    handleClickFilter,
    currentValue: currentValue === '전체' ? '아이 선택' : currentValue,
    profileUrl,
  };

  return <ChangeProfileView {...ChangeProfileVAProps} />;
};

export default ChangeProfile;
