import { useQuery } from 'react-query';

import { familiesInfo } from '@/apis/family';
import { userInfo } from '@/apis/user';
import useControlCouponFilter from '@/hooks/useControlCouponFilter';

import LinkedFilterView from './LinkedFilterView';

const LinkedFilter = () => {
  const { data: user } = useQuery(['userInfo'], userInfo);
  const memberType = user?.data?.memberType;
  const { data: familyInfo } = useQuery(['families'], familiesInfo);
  const families = familyInfo?.data?.families;

  const { handleClickFilter, currentValue } = useControlCouponFilter();

  const isKid = memberType?.name === 'KID';

  const currentFilterMemberType =
    families?.find((family) => family.nickname === currentValue)?.memberType
      .detail || '';

  const LinkedFilterVAProps = {
    handleClickFilter,
    isKid,
    currentFilterMemberType,
    currentValue,
  };

  return <LinkedFilterView {...LinkedFilterVAProps} />;
};

export default LinkedFilter;
