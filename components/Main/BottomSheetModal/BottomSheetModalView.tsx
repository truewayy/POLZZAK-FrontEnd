import { Box, Text, VStack } from '@chakra-ui/react';
import Sheet from 'react-modal-sheet';

import { CheckIcon } from '@/public/icon';

interface BottomSheetModalVAProps {
  handleClickFilter: () => void;
  handleChangeFilter: (nickname: string) => void;
  filterOn: boolean;
  currentValue: string;
  families: {
    memberId: number;
    nickname: string;
    memberType: {
      name: string;
      detail: string;
    };
    profileUrl: string;
  }[];
}

const BottomSheetModalView = ({
  handleClickFilter,
  handleChangeFilter,
  filterOn,
  currentValue,
  families,
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
            <Box
              as="button"
              w="100%"
              p="12px 16px"
              pos="relative"
              layerStyle="body2"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="8px"
              textAlign="left"
              bgColor="gray.100"
              onClick={() => handleChangeFilter('전체')}
              {...(currentValue === '전체' && {
                bgColor: 'blue.100',
                borderColor: 'polzzak.default',
                color: 'polzzak.default',
              })}
            >
              전체
              {currentValue === '전체' && (
                <CheckIcon
                  pos="absolute"
                  right="16px"
                  top="50%"
                  transform="translateY(-50%)"
                />
              )}
            </Box>
            {families?.map(({ memberId, nickname }) => (
              <Box
                as="button"
                key={memberId}
                w="100%"
                p="12px 16px"
                pos="relative"
                layerStyle="body2"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="8px"
                textAlign="left"
                bgColor="gray.100"
                onClick={() => handleChangeFilter(nickname)}
                {...(currentValue === nickname && {
                  bgColor: 'blue.100',
                  borderColor: 'polzzak.default',
                  color: 'polzzak.default',
                })}
              >
                {nickname}
                {currentValue === nickname && (
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
