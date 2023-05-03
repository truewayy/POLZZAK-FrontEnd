import { Box, Text, VStack } from '@chakra-ui/react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useRecoilValue } from 'recoil';

import useControlFilter from '@/hooks/useControlFilter';
import { CheckIcon } from '@/public/icon';
import userInfoAtom from '@/store/userInfo';

const BottomSheetModal = () => {
  const { handleClickFilter, handleChangeFilter, filterOn, currentValue } =
    useControlFilter();
  const { chains } = useRecoilValue(userInfoAtom);

  const BottomSheetModalVAProps: BottomSheetModalVAProps = {
    handleClickFilter,
    handleChangeFilter,
    filterOn,
    currentValue,
    chains,
  };

  return <BottomSheetModalView {...BottomSheetModalVAProps} />;
};

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
      <Text layerStyle="highlight16SB">누구의 도장판을 볼까요?</Text>
      <VStack w="100%" spacing="10px">
        {chains.map((chain: string) => (
          <Box
            as="button"
            key={chain}
            w="100%"
            p="12px 16px"
            pos="relative"
            layerStyle="highlight14SB"
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

export default BottomSheetModal;
