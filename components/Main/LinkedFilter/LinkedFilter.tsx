import useControlFilter from '@/hooks/useControlFilter';

import LinkedFilterView from './LinkedFilterView';

const LinkedFilter = () => {
  const { handleClickFilter, currentValue } = useControlFilter();

  const LinkedFilterVAProps = {
    handleClickFilter,
    currentValue,
  };

  return <LinkedFilterView {...LinkedFilterVAProps} />;
};

export default LinkedFilter;
