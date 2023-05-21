import { Box, Text, VStack } from '@chakra-ui/react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { CheckIcon } from '@/public/icon';

interface BottomSheetModalVAProps {
  handleClickFilter: () => void;
  handleChangeFilter: (nickname: string) => void;
  filterOn: boolean;
  currentValue: string;
  chains: string[];
}

const BottomSheetModalView = ({
  handleClickFilter,
  handleChangeFilter,
  filterOn,
  currentValue,
  chains,
}: BottomSheetModalVAProps) => (
  <BottomSheet
    open={filterOn}
    onDismiss={handleClickFilter}
    scrollLocking={false}
    maxHeight={600}
    defaultSnap={({ maxHeight }) => maxHeight * 0.6}
    snapPoints={({ maxHeight }) => [maxHeight * 0.7, maxHeight * 0.5]}
  >
    <VStack w="100%" h={500} bg="white" p="20px" spacing="20px">
      <Text layerStyle="subtitle3">도장판을 생성해줄 아이를 선택해주세요 </Text>
      <VStack w="100%" spacing="10px">
        {chains
          .filter((chain) => chain !== '전체')
          .map((chain: string) => (
            <Box
              as="button"
              key={chain}
              w="100%"
              p="12px 16px"
              pos="relative"
              layerStyle="body2"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="8px"
              textAlign="left"
              bgColor="gray.100"
              onClick={() => handleChangeFilter(chain)}
              {...(currentValue === chain && {
                bgColor: 'blue.100',
                borderColor: 'polzzak.default',
                color: 'polzzak.default',
              })}
            >
              {chain}
              {currentValue === chain && (
                <CheckIcon
                  pos="absolute"
                  right="16px"
                  top="50%"
                  transform="translateY(-50%)"
                />
              )}
            </Box>
          ))}
      </VStack>
    </VStack>
  </BottomSheet>
);

export default BottomSheetModalView;