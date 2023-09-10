import { Box, Flex, Text } from '@chakra-ui/react';

import { FilterArrowIcon } from '@/public/icon';

interface LinkedFilterVAProps {
  handleClickFilter: () => void;
  isKid: boolean;
  currentFilterMemberType: string;
  currentValue: string;
}

const LinkedFilterView = ({
  handleClickFilter,
  isKid,
  currentFilterMemberType,
  currentValue,
}: LinkedFilterVAProps) => (
  <Flex
    w="100%"
    p="0 5%"
    mb="20px"
    alignItems="center"
    cursor="pointer"
    onClick={handleClickFilter}
    gap="6px"
  >
    {currentValue !== '전체' && (
      <Text layerStyle="subtitle16Sbd" color="polzzak.default" pr="2px">
        {isKid ? 'From' : 'To'}
      </Text>
    )}
    {isKid && currentValue !== '전체' && (
      <Box
        p="4px 8px"
        bg="gray.200"
        border="1px solid rgba(0, 0, 0, 0.12)"
        borderRadius="8px"
        layerStyle="body14Sbd"
        color="gray.700"
        mr="2px"
      >
        {currentFilterMemberType}
      </Box>
    )}
    <Text layerStyle="title20Bd">{currentValue}</Text>
    <FilterArrowIcon w={5} h={5} />
  </Flex>
);

export default LinkedFilterView;
