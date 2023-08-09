/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';

import { CheckIcon } from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';

interface ChooseMissionProps {
  isRequest?: boolean;
  missionRequestList?: {
    id: number;
    missionId: number;
    missionContent: string;
    createdDate: string;
  }[];
  missions?: {
    id: number;
    content: string;
  }[];
  missionId: number;
  missionRequestId?: number;
  handleClickMission?: (id: number) => void;
  handleClickRequestMission?: (id: number, requestId: number) => void;
  handleClickClose: () => void;
  handleClickNextButton: () => void;
}

const ChooseMission = ({
  isRequest = false,
  missionRequestList,
  missions,
  missionId,
  missionRequestId,
  handleClickMission,
  handleClickRequestMission,
  handleClickClose,
  handleClickNextButton,
}: ChooseMissionProps) => {
  const {
    memberType: { name },
  } = useRecoilValue(userInfoAtom);

  const isKid = name === 'KID';

  const getFormattedDate = (originalDate: string) =>
    new Date(originalDate).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
    });

  return (
    <>
      <VStack w="100%" spacing="6px">
        <Text layerStyle="subtitle16Sbd" color="#2E3038">
          {isKid
            ? '도장 요청 보내기'
            : isRequest
            ? '도장 요청 선택'
            : '미션 직접 선택'}
        </Text>
        <Text layerStyle="body13Md" color="#9C9CA8">
          {isKid ? '어떤 미션을 완료했나요?' : '1/2'}
        </Text>
      </VStack>
      <VStack w="100%" h="300px" overflowY="auto" spacing="8px">
        {isRequest
          ? missionRequestList?.map(
              ({
                id: requestId,
                missionId: id,
                missionContent,
                createdDate,
              }) => (
                <Flex
                  key={requestId}
                  justify="space-between"
                  w="100%"
                  p="12px 16px"
                  pos="relative"
                  layerStyle="body14Sbd"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="8px"
                  textAlign="left"
                  onClick={() =>
                    handleClickRequestMission &&
                    handleClickRequestMission(id, requestId)
                  }
                  {...(missionRequestId === requestId && {
                    bgColor: 'blue.100',
                    borderColor: 'polzzak.default',
                  })}
                >
                  <Text>{missionContent}</Text>
                  <Flex gap="10px" align="center">
                    <Text layerStyle="caption12Md" color="gray.500">
                      {getFormattedDate(createdDate)}
                    </Text>
                    <Box
                      layerStyle="caption12Sbd"
                      p="3px 6px"
                      w="auto"
                      h="auto"
                      color="error.500"
                      border="1px solid rgba(255, 111, 80, 0.16)"
                      borderRadius="6px"
                      bg="error.100"
                      _active={{ bg: 'error.500', color: 'white' }}
                      _disabled={{
                        bg: 'rgba(255, 111, 80, 0.16)',
                        border: '1px solid rgba(255, 111, 80, 0.16)',
                        color: 'white',
                      }}
                    >
                      거절하기
                    </Box>
                  </Flex>
                </Flex>
              )
            )
          : missions?.map(({ id, content }) => (
              <Box
                key={id}
                as="button"
                w="100%"
                p="12px 16px"
                pos="relative"
                layerStyle="body14Sbd"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="8px"
                textAlign="left"
                onClick={() => handleClickMission && handleClickMission(id)}
                {...(missionId === id && {
                  bgColor: 'blue.100',
                  borderColor: 'polzzak.default',
                  color: 'polzzak.default',
                })}
              >
                {content}
                {missionId === id && (
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
      <Flex w="100%" p="0 5%" gap="7px" pos="absolute" bottom="20px">
        <Button
          variant="unstyled"
          bgColor="gray.300"
          h="50px"
          w="50%"
          borderRadius="8px"
          onClick={(e) => {
            e.stopPropagation();
            handleClickClose();
          }}
        >
          <Text layerStyle="subtitle16Sbd" color="white" textAlign="center">
            닫기
          </Text>
        </Button>
        <Button
          variant="unstyled"
          bgColor="polzzak.default"
          h="50px"
          w="50%"
          borderRadius="8px"
          isDisabled={!missionId}
          onClick={(e) => {
            e.stopPropagation();
            handleClickNextButton();
          }}
        >
          <Text layerStyle="subtitle16Sbd" color="white" textAlign="center">
            {isKid ? '요청하기' : '다음'}
          </Text>
        </Button>
      </Flex>
    </>
  );
};

export default ChooseMission;
