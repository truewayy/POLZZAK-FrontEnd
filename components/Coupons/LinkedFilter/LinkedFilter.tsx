import { useRecoilValue } from 'recoil';

import useControlCouponFilter from '@/hooks/useControlCouponFilter';
import { userInfoAtom } from '@/store/userInfo';

import LinkedFilterView from './LinkedFilterView';

const LinkedFilter = () => {
  const { families, memberType } = useRecoilValue(userInfoAtom);
  const { handleClickFilter, currentValue } = useControlCouponFilter();

  const isKid = memberType.name === 'KID';

  const currentFilterMemberType =
    families.find((family) => family.nickname === currentValue)?.memberType
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
