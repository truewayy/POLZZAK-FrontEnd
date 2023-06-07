import { Flex, Text } from '@chakra-ui/react';

import { FilterArrowIcon } from '@/public/icon';

interface LinkedFilterVAProps {
  handleClickFilter: () => void;
  currentValue: string;
  noFamily: boolean;
}

const LinkedFilterView = ({
  handleClickFilter,
  currentValue,
  noFamily,
}: LinkedFilterVAProps) => (
  <Flex
    w="100%"
    p="0 5%"
    mb="20px"
    alignItems="center"
    cursor="pointer"
    onClick={handleClickFilter}
    gap="4px"
    display={noFamily ? 'none' : 'flex'}
  >
    <Text layerStyle="title3">
      {currentValue}
      {currentValue !== '전체' && (
        <Text as="span" layerStyle="body18R">
          님과 함께해요
        </Text>
      )}
    </Text>
    <FilterArrowIcon w={5} h={5} />
  </Flex>
);

export default LinkedFilterView;
