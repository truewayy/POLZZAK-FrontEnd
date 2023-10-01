/* eslint-disable no-nested-ternary */
import 'swiper/css';

import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { familiesInfo } from '@/apis/family';
import { stampboardList } from '@/apis/stamp';
import { MainfilterAtom } from '@/store/filter';

import ProgressingStampsNoFamiles from './ProgressingStampsNoFamiles';
import ProgressingStampsSkeleton from './ProgressingStampsSkeleton';
import ProgressingStampsView from './ProgressingStampsView';

const ProgressingStamps = () => {
  const { data: familyInfo } = useQuery(['families'], familiesInfo);
  const families = familyInfo?.data?.families;
  const [isNoFamily, setIsNoFamily] = useState(true);

  const filter = useRecoilValue(MainfilterAtom);
  const currentFilterId = families?.find(
    (family) => family.nickname === filter
  )?.memberId;
  const { data, isLoading, refetch } = useQuery(
    ['stampboardList', 'in_progress', filter],
    () =>
      stampboardList({
        stampBoardGroup: 'in_progress',
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

  const ProgressingStampsVAProps = {
    handleRefresh,
    cards,
    filter,
  };

  return isNoFamily ? (
    <ProgressingStampsNoFamiles />
  ) : isLoading ? (
    <ProgressingStampsSkeleton filter={filter} />
  ) : (
    <ProgressingStampsView {...ProgressingStampsVAProps} />
  );
};

export default ProgressingStamps;
