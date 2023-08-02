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
    gap="4px"
  >
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
    <Text layerStyle="title20Bd">
      {currentValue}
      {currentValue !== '전체' && (
        <Text as="span" layerStyle="subtitle18Rg">
          님과 함께해요
        </Text>
      )}
    </Text>
    <FilterArrowIcon w={5} h={5} />
  </Flex>
);

export default LinkedFilterView;
