import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { familiesInfo } from '@/apis/family';
import { stampboardList } from '@/apis/stamp';
import { MainfilterAtom } from '@/store/filter';

import CompletedStampsSkeleton from './CompletedStampsSkeleton';
import CompletedStampsView from './CompletedStampsView';

const CompletedStamps = () => {
  const { data: familyInfo } = useQuery(['families'], familiesInfo);
  const families = familyInfo?.data?.families;
  const [isNoFamily, setIsNoFamily] = useState(true);

  const filter = useRecoilValue(MainfilterAtom);
  const currentFilterId = families?.find(
    (family) => family.nickname === filter
  )?.memberId;

  const { data, isLoading, refetch } = useQuery(
    ['stampboardList', 'ended', filter],
    () =>
      stampboardList({
        stampBoardGroup: 'ended',
        partnerMemberId: currentFilterId,
      }),
    {
      enabled: !isNoFamily,
      cacheTime: 0,
      staleTime: 0,
    }
  );

  const cards = data?.data;

  const handleRefresh = async () => {
    await refetch();
  };

  useEffect(() => {
    const noFamily = families?.length === 0;

    setIsNoFamily(noFamily);
  }, [families]);

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
