import { Box, Text, VStack } from '@chakra-ui/react';
import Sheet from 'react-modal-sheet';

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
  <Sheet
    isOpen={filterOn}
    onClose={handleClickFilter}
    snapPoints={[500, 320, 200, 0]}
    initialSnap={1}
    style={{
      maxWidth: '560px',
      width: '100%',
      margin: '0 auto',
    }}
  >
    <Sheet.Container>
      <Sheet.Header />
      <Sheet.Content>
        <VStack w="100%" h={500} bg="white" p="20px" spacing="20px">
          <Text layerStyle="subtitle3">누구의 도장판을 볼까요?</Text>
          <VStack w="100%" spacing="10px">
            {chains.map((chain: string) => (
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
      </Sheet.Content>
    </Sheet.Container>
    <Sheet.Backdrop onTap={handleClickFilter} />
  </Sheet>
);

export default BottomSheetModalView;
