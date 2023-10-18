/* eslint-disable no-nested-ternary */
import 'swiper/css';

import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { couponList } from '@/apis/coupon';
import { familiesInfo } from '@/apis/family';
import { CouponfilterAtom } from '@/store/filter';

import ProgressingCouponsNoFamiles from './ProgressingCouponsNoFamiles';
import ProgressingCouponsSkeleton from './ProgressingCouponsSkeleton';
import ProgressingCouponsView from './ProgressingCouponsView';

const ProgressingCoupons = () => {
  const { data: familyInfo } = useQuery(['families'], familiesInfo);
  const families = familyInfo?.data?.families;
  const [isNoFamily, setIsNoFamily] = useState(true);

  const filter = useRecoilValue(CouponfilterAtom);
  const currentFilterId = families?.find(
    (family) => family.nickname === filter
  )?.memberId;

  const { data, isLoading, refetch } = useQuery(
    ['couponList', 'issued', filter],
    () =>
      couponList({ couponState: 'issued', partnerMemberId: currentFilterId }),
    {
      enabled: !isNoFamily,
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
    <ProgressingCouponsNoFamiles />
  ) : isLoading ? (
    <ProgressingCouponsSkeleton filter={filter} />
  ) : (
    <ProgressingCouponsView {...ProgressingStampsVAProps} />
  );
};

export default ProgressingCoupons;
