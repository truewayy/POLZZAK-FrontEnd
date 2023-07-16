/* eslint-disable react/no-array-index-key */
import { Circle, Flex } from '@chakra-ui/react';

import { LeftArrow } from '@/public/icon';

interface HeaderViewProps {
  isSelectTypePage: boolean;
  progress: boolean[];
  goBack: () => void;
}

const HeaderView = ({
  isSelectTypePage,
  progress,
  goBack,
}: HeaderViewProps) => (
  <Flex
    w="100%"
    h="50px"
    mb="36px"
    justifyContent="space-between"
    alignItems="center"
  >
    <LeftArrow w={11} h={19} onClick={goBack} />
    {!isSelectTypePage && (
      <Flex gap="8px">
        {progress?.map((value, i) => (
          <Circle
            key={i}
            size="8px"
            bg={value ? 'polzzak.default' : 'gray.300'}
          />
        ))}
      </Flex>
    )}
  </Flex>
);

export default HeaderView;
