/* eslint-disable no-nested-ternary */
import 'swiper/css';

import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { stampboardList } from '@/apis/stamp';
import { filterAtom } from '@/store/filter';
import { userInfoAtom } from '@/store/userInfo';

import ProgressingStampsNoFamiles from './ProgressingStampsNoFamiles';
import ProgressingStampsSkeleton from './ProgressingStampsSkeleton';
import ProgressingStampsView from './ProgressingStampsView';

const ProgressingStamps = () => {
  const { families } = useRecoilValue(userInfoAtom);
  const filter = useRecoilValue(filterAtom);
  const noFamiles = families.length === 0;
  const { data, isLoading, refetch } = useQuery(
    ['stampboardList', 'in_progress', filter],
    () => stampboardList({ stampBoardGroup: 'in_progress' }),
    {
      enabled: !noFamiles,
    }
  );

  const cards = data?.data;

  const handleRefresh = async () => {
    await refetch();
  };

  const ProgressingStampsVAProps = {
    handleRefresh,
    cards,
    filter,
  };

  return noFamiles ? (
    <ProgressingStampsNoFamiles />
  ) : isLoading ? (
    <ProgressingStampsSkeleton filter={filter} />
  ) : (
    <ProgressingStampsView {...ProgressingStampsVAProps} />
  );
};

export default ProgressingStamps;
