import { Flex, Text } from '@chakra-ui/react';

import { SearchIcon } from '@/public/icon';

interface SearchInputVAProps {
  handleClickInputFrame: () => void;
}

const SearchInputView = ({ handleClickInputFrame }: SearchInputVAProps) => (
  <Flex
    w="100%"
    borderRadius="8px"
    border="1px solid"
    borderColor="gray.300"
    p="12px 16px"
    h="45px"
    cursor="pointer"
    justify="space-between"
    onClick={handleClickInputFrame}
  >
    <Text layerStyle="body3" color="gray.500">
      아이추가
    </Text>
    <SearchIcon w="20px" h="20px" />
  </Flex>
);

export default SearchInputView;
