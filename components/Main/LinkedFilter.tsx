import { Flex, Text } from '@chakra-ui/react';

import useControlFilter from '@/hooks/useControlFilter';
import { FilterArrowIcon } from '@/public/icon';

const LinkedFilter = () => {
  const { handleClickFilter, currentValue } = useControlFilter();

  const LinkedFilterVAProps = {
    handleClickFilter,
    currentValue,
  };

  return <LinkedFilterView {...LinkedFilterVAProps} />;
};

interface LinkedFilterVAProps {
  handleClickFilter: () => void;
  currentValue: string;
}

const LinkedFilterView = ({
  handleClickFilter,
  currentValue,
}: LinkedFilterVAProps) => (
  <Flex
    w="100%"
    mb="20px"
    justifyContent="space-between"
    alignItems="center"
    cursor="pointer"
    onClick={handleClickFilter}
  >
    <Text layerStyle="head20B">
      {currentValue}
      <Text as="span" layerStyle="body18R">
        님과 함께해요
      </Text>
    </Text>
    <FilterArrowIcon w={5} h={5} />
  </Flex>
);

export default LinkedFilter;
