import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import { SearchIcon } from '@/public/icon';

const SearchInputView = () => (
  <InputGroup w="100%">
    <Input
      variant="unstyled"
      placeholder="아이 추가"
      borderRadius="8px"
      border="1px solid"
      borderColor="gray.300"
      layerStyle="body3"
      p="12px 16px"
      _placeholder={{ color: 'gray.500' }}
    />
    <InputRightElement>
      <SearchIcon w="20px" h="20px" />
    </InputRightElement>
  </InputGroup>
);

export default SearchInputView;
