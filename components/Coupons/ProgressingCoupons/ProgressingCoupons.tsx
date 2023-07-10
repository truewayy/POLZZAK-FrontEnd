/* eslint-disable no-nested-ternary */
import 'swiper/css';

import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { stampboardList } from '@/apis/stamp';
import { filterAtom } from '@/store/filter';
import { userInfoAtom } from '@/store/userInfo';

import ProgressingCouponsNoFamiles from './ProgressingCouponsNoFamiles';
import ProgressingCouponsSkeleton from './ProgressingCouponsSkeleton';
import ProgressingCouponsView from './ProgressingCouponsView';

const ProgressingCoupons = () => {
  const { families } = useRecoilValue(userInfoAtom);
  const [isNoFamily, setIsNoFamily] = useState(true);

  const filter = useRecoilValue(filterAtom);
  const { data, isLoading, refetch } = useQuery(
    ['stampboardList', 'in_progress', filter],
    () => stampboardList({ stampBoardGroup: 'in_progress' }),
    {
      enabled: !isNoFamily,
    }
  );

  const cards = data?.data;

  const handleRefresh = async () => {
    await refetch();
  };

  useEffect(() => {
    const noFamily = families.length === 0;

    setIsNoFamily(noFamily);
  }, [families]);

  const ProgressingStampsVAProps = {
    handleRefresh,
    cards,
    filter,
  };

  return isNoFamily ? (
    <ProgressingCouponsNoFamiles />
  ) : isLoading ? (
    <ProgressingCouponsSkeleton filter={filter} />
  ) : (
    <ProgressingCouponsView {...ProgressingStampsVAProps} />
  );
};

export default ProgressingCoupons;
