import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { couponList } from '@/apis/coupon';
import { familiesInfo } from '@/apis/family';
import { CouponfilterAtom } from '@/store/filter';

import CompletedStampsSkeleton from './CompletedCouponsSkeleton';
import CompletedStampsView from './CompletedCouponsView';

const CompletedCoupons = () => {
  const { data: familyInfo } = useQuery(['families'], familiesInfo);
  const families = familyInfo?.data?.families;
  const [isNoFamily, setIsNoFamily] = useState(true);

  const filter = useRecoilValue(CouponfilterAtom);
  const currentFilterId = families?.find(
    (family) => family.nickname === filter
  )?.memberId;

  const { data, isLoading, refetch } = useQuery(
    ['couponList', 'rewarded', filter],
    () =>
      couponList({ couponState: 'rewarded', partnerMemberId: currentFilterId }),
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

  const CompletedCouponsVAProps = {
    handleRefresh,
    cards,
    filter,
  };

  return isLoading ? (
    <CompletedStampsSkeleton filter={filter} />
  ) : (
    <CompletedStampsView {...CompletedCouponsVAProps} />
  );
};

export default CompletedCoupons;
