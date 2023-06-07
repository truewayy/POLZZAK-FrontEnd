import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { stampboardList } from '@/apis/stamp';
import { filterAtom } from '@/store/filter';
import { userInfoAtom } from '@/store/userInfo';

import CompletedStampsSkeleton from './CompletedStampsSkeleton';
import CompletedStampsView from './CompletedStampsView';

const CompletedStamps = () => {
  const { families } = useRecoilValue(userInfoAtom);
  const filter = useRecoilValue(filterAtom);
  const noFamiles = families.length === 0;
  const { data, isLoading, refetch } = useQuery(
    ['stampboardList', 'ended', filter],
    () => stampboardList({ stampBoardGroup: 'ended' }),
    {
      enabled: !noFamiles,
    }
  );

  const cards = data?.data;

  const handleRefresh = async () => {
    await refetch();
  };

  const CompletedStampsVAProps = {
    handleRefresh,
    cards,
    filter,
  };

  return isLoading ? (
    <CompletedStampsSkeleton filter={filter} />
  ) : (
    <CompletedStampsView {...CompletedStampsVAProps} />
  );
};

export default CompletedStamps;
