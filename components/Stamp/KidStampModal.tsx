import { Box, Button, Flex, Square, Text, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from 'react-query';

import { stampMissionRequest } from '@/apis/stamp';
import { CheckIcon } from '@/public/icon';

import Timer from './Timer';

interface KidStampModalProps {
  stampboardId: string;
  guardianId: number;
  guardianType: string;
  missions: {
    id: number;
    content: string;
  }[];
  onClose: () => void;
  snapPoint: number;
  setSnapPoint: Dispatch<SetStateAction<number>>;
}

const KidStampModal = ({
  stampboardId,
  guardianId,
  guardianType,
  missions,
  onClose,
  snapPoint,
  setSnapPoint,
}: KidStampModalProps) => {
  const [missionId, setMissionId] = useState<number>(0);

  const request = useMutation(
    () => stampMissionRequest(Number(stampboardId), missionId, guardianId),
    {
      onSuccess: () => {
        setSnapPoint(1);
      },
    }
  );

  const handleClickMission = (id: number) => {
    setMissionId(id);
  };

  const handleClickRequest = () => {
    request.mutate();
  };

  return (
    <VStack p="0 5%" w="100%" spacing="25px">
      {snapPoint === 0 ? (
        <>
          <VStack w="100%" spacing="6px">
            <Text layerStyle="subtitle16Sbd" color="#2E3038">
              도장 요청 보내기
            </Text>
            <Text layerStyle="body13Md" color="#9C9CA8">
              어떤 미션을 완료했나요?
            </Text>
          </VStack>
          <VStack w="100%" h="200px" overflowY="auto" spacing="8px">
            {missions.map(({ id, content }) => (
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
                onClick={() => handleClickMission(id)}
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
              onClick={onClose}
            >
              <Text layerStyle="subtitle16Sbd" color="white" textAlign="center">
                요청 취소
              </Text>
            </Button>
            <Button
              variant="unstyled"
              bgColor="polzzak.default"
              h="50px"
              w="50%"
              borderRadius="8px"
              isDisabled={!missionId || request.isLoading}
              onClick={handleClickRequest}
            >
              <Text layerStyle="subtitle16Sbd" color="white" textAlign="center">
                요청 하기
              </Text>
            </Button>
          </Flex>
        </>
      ) : (
        <VStack w="100%" spacing="30px" pos="relative">
          <Box pos="absolute" top="0" right="0">
            <Timer count={3} onTimerEnd={onClose} />
          </Box>
          <Text layerStyle="subtitle20Sbd" color="#2E3038">
            도장 요청 완료!
          </Text>
          <Square size="200px" bg="#EEEEF4" />
          <Text layerStyle="body14Md" color="#9C9CA8" textAlign="center">
            <Text as="span" color="polzzak.highlighted">
              {guardianType}
            </Text>
            에게 도장을 요청했어요!
            <br />
            잠시만 기다려 주세요.
          </Text>
        </VStack>
      )}
    </VStack>
  );
};

export default KidStampModal;
