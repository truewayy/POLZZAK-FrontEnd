import { Box, Text, VStack } from '@chakra-ui/react';
import Sheet from 'react-modal-sheet';

import { CheckIcon } from '@/public/icon';

interface BottomSheetModalVAProps {
  onClose: () => void;
  handleChangeFilter: (nickname: string) => void;
  filterOn: boolean;
  currentValue: string;
  families: {
    memberId: number;
    nickname: string;
    memberType: string;
    profileUrl: string;
  }[];
}

const BottomSheetModalView = ({
  onClose,
  handleChangeFilter,
  filterOn,
  currentValue,
  families,
}: BottomSheetModalVAProps) => (
  <Sheet
    isOpen={filterOn}
    onClose={onClose}
    snapPoints={[500, 350, 200, 0]}
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
          <Text layerStyle="subtitle3">
            도장판을 생성해줄 아이를 선택해주세요{' '}
          </Text>
          <VStack w="100%" spacing="10px">
            {families
              .filter(({ nickname }) => nickname !== '전체')
              .map((chain) => (
                <Box
                  as="button"
                  key={chain.memberId}
                  w="100%"
                  p="12px 16px"
                  pos="relative"
                  layerStyle="body2"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="8px"
                  textAlign="left"
                  bgColor="gray.100"
                  onClick={() => handleChangeFilter(chain.nickname)}
                  {...(currentValue === chain.nickname && {
                    bgColor: 'blue.100',
                    borderColor: 'polzzak.default',
                    color: 'polzzak.default',
                  })}
                >
                  {chain.nickname}
                  {currentValue === chain.nickname && (
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
    <Sheet.Backdrop
      onTap={onClose}
      style={{ background: 'rgba(0, 0, 0, 0.4)' }}
    />
  </Sheet>
);

export default BottomSheetModalView;
