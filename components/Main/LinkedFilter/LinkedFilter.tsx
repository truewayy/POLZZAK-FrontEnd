import { useQuery } from 'react-query';

import { familiesInfo } from '@/apis/family';
import { userInfo } from '@/apis/user';
import useControlFilter from '@/hooks/useControlMainFilter';

import LinkedFilterView from './LinkedFilterView';

const LinkedFilter = () => {
  const { data: user } = useQuery(['userInfo'], userInfo);
  const memberType = user?.data?.memberType;
  const { data: my } = useQuery(['families'], familiesInfo);
  const families = my?.data?.families;

  const { handleClickFilter, currentValue } = useControlFilter();

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
