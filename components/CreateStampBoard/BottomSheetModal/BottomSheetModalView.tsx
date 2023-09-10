import { Button, Circle, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import Sheet from 'react-modal-sheet';

interface BottomSheetModalVAProps {
  onClose: () => void;
  handleChangeFilter: (nickname: string) => void;
  filterOn: boolean;
  families:
    | {
        memberId: number;
        nickname: string;
        memberType: {
          name: string;
          detail: string;
        };
        profileUrl: string;
      }[]
    | undefined;
  isLoading: boolean;
  selectedProfile: string;
  handleClickProfile: (profile: string) => void;
}

const BottomSheetModalView = ({
  onClose,
  handleChangeFilter,
  filterOn,
  families,
  isLoading,
  selectedProfile,
  handleClickProfile,
}: BottomSheetModalVAProps) => (
  <Sheet
    isOpen={filterOn}
    onClose={onClose}
    snapPoints={[500, 350, 200, 0]}
    initialSnap={0}
    style={{
      maxWidth: '560px',
      width: '100%',
      margin: '0 auto',
    }}
  >
    <Sheet.Container>
      <Sheet.Header />
      <Sheet.Content>
        <VStack
          w="100%"
          h={450}
          bg="white"
          p="20px"
          spacing="20px"
          pos="relative"
        >
          <Text layerStyle="subtitle16Sbd">
            도장판을 누구에게 만들어줄까요?
          </Text>
          <VStack w="100%" spacing="10px">
            {isLoading ? (
              <VStack w="100%" h="200px" justify="center">
                <Spinner
                  size="xl"
                  color="blue.400"
                  emptyColor="polzzak.disabled"
                  thickness="7px"
                />
              </VStack>
            ) : (
              families
                ?.filter(({ nickname }) => nickname !== '전체')
                .map((chain) => (
                  <Flex
                    as="button"
                    key={chain.memberId}
                    w="100%"
                    p="12px 16px"
                    align="center"
                    gap="16px"
                    pos="relative"
                    layerStyle="body14Md"
                    borderRadius="8px"
                    textAlign="left"
                    bgColor="white"
                    onClick={() => handleClickProfile(chain.nickname)}
                    {...(selectedProfile === chain.nickname && {
                      bgColor: 'blue.100',
                      border: '1px solid',
                      borderColor: 'polzzak.default',
                      color: 'polzzak.default',
                    })}
                  >
                    <Circle
                      size="60px"
                      bgImage={chain.profileUrl}
                      bgSize="cover"
                      bgPosition="center"
                      bgRepeat="no-repeat"
                    />
                    {chain.nickname}
                    {selectedProfile === chain.nickname && (
                      <Text
                        layerStyle="body14Sbd"
                        color="polzzak.default"
                        pos="absolute"
                        right="16px"
                        top="50%"
                        transform="translateY(-50%)"
                      >
                        선택
                      </Text>
                    )}
                  </Flex>
                ))
            )}
          </VStack>
          <Button
            w="90%"
            h="auto"
            p="14px 0"
            layerStyle="subtitle16Sbd"
            bgColor="polzzak.default"
            color="white"
            pos="absolute"
            bottom="20px"
            onClick={() => handleChangeFilter(selectedProfile)}
            isDisabled={selectedProfile === '전체'}
          >
            선택 완료
          </Button>
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
