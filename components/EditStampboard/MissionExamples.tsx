import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { CheckIcon } from '@/public/icon';
import { missionEditAtom } from '@/store/missions';

const missionExamples = [
  {
    id: 1,
    content: '1시간 집중해서 공부하기',
  },
  {
    id: 2,
    content: '강아지 목욕 시켜주기',
  },
  {
    id: 3,
    content: '강아지 산책 시키고 오기',
  },
  {
    id: 4,
    content: '게임하지 않기',
  },
  {
    id: 5,
    content: '고양이 화장실 갈아주기',
  },
  {
    id: 6,
    content: '공원 세바퀴 돌고 오기',
  },
  {
    id: 7,
    content: '과자 안 먹기',
  },
  {
    id: 8,
    content: '나갈 때 선크림 바르기',
  },
  {
    id: 9,
    content: '나갔다 와서 옷 정리하기',
  },
  {
    id: 10,
    content: '누워있지 않기',
  },
  {
    id: 11,
    content: '떼 쓰지 않기',
  },
  {
    id: 12,
    content: '목욕하기',
  },
  {
    id: 13,
    content: '반찬 골고루 먹기',
  },
  {
    id: 14,
    content: '밥 남기지 않고 싹싹 먹기',
  },
  {
    id: 15,
    content: '밥 돌아다니지 않고 먹기',
  },
  {
    id: 16,
    content: '방 불 꺼주기',
  },
  {
    id: 17,
    content: '방 청소하기',
  },
  {
    id: 18,
    content: '분리수거 하고 오기',
  },
  {
    id: 19,
    content: '설거지하기',
  },
  {
    id: 20,
    content: '숙제 하기',
  },
  {
    id: 21,
    content: '시골 같이 가기',
  },
  {
    id: 22,
    content: '시험 _점 맞아오기',
  },
  {
    id: 23,
    content: '심부름 갔다 오기',
  },
  {
    id: 24,
    content: '아이패드 그만하기',
  },
  {
    id: 25,
    content: '애정표현 해주기',
  },
  {
    id: 26,
    content: '엄마 아빠랑 외식하기',
  },
  {
    id: 27,
    content: '엄마, 아빠 안마해주기',
  },
  {
    id: 28,
    content: '엄마랑 같이 등산가기',
  },
  {
    id: 29,
    content: '엄마랑 같이 책 한권 읽기',
  },
  {
    id: 30,
    content: '영어 단어 시험 100점 맞아오기',
  },
  {
    id: 31,
    content: '운동하기',
  },
  {
    id: 32,
    content: '음식 포장 픽업해오기',
  },
  {
    id: 33,
    content: '일기 쓰기',
  },
  {
    id: 34,
    content: '일어나면 이불 정리하기',
  },
  {
    id: 35,
    content: '일찍 잠자기',
  },
  {
    id: 36,
    content: '입술 뜯지 않기',
  },
  {
    id: 37,
    content: '장난감 정리하기',
  },
  {
    id: 38,
    content: '책 한권 읽기',
  },
  {
    id: 39,
    content: '청소기 밀기',
  },
  {
    id: 40,
    content: '탄산 음료 안 먹기',
  },
  {
    id: 41,
    content: '편식 안 하기',
  },
  {
    id: 42,
    content: '하루 한 번 비타민 먹기',
  },
  {
    id: 43,
    content: '하루 한 번 유산균 먹기',
  },
  {
    id: 44,
    content: '학교 지각하지 않고 가기',
  },
  {
    id: 45,
    content: '학원 가기',
  },
  {
    id: 46,
    content: '학원 안 간다고 안 하기',
  },
  {
    id: 47,
    content: '학원 지각하지 않고 가기',
  },
  {
    id: 48,
    content: '한약 챙겨 먹기',
  },
  {
    id: 49,
    content: '핸드폰 그만하기',
  },
  {
    id: 50,
    content: '형/누나/오빠/언니와 싸우지 않기',
  },
  {
    id: 51,
    content: '홍삼 챙겨 먹기',
  },
];

interface MissionExamplesProps {
  onClose: () => void;
}

const MissionExamples = ({ onClose }: MissionExamplesProps) => {
  const [missions, setMissions] = useRecoilState(missionEditAtom);
  const [selectedMissions, setSelectedMissions] = useState<
    { id: number; content: string }[]
  >([]);

  const isMissionLimit = missions.length >= 50;

  const handleClickMission = (mission: { id: number; content: string }) => {
    if (selectedMissions.includes(mission)) {
      setSelectedMissions(
        selectedMissions.filter(
          (selectedMission) => selectedMission !== mission
        )
      );
    } else {
      setSelectedMissions([...selectedMissions, mission]);
    }
  };

  const handleClickAddButton = () => {
    if (!isMissionLimit) {
      selectedMissions.map((mission) =>
        setMissions((prev) => [
          ...prev,
          {
            id: prev[prev.length - 1].id + 1,
            content: mission.content,
          },
        ])
      );
    }
    onClose();
  };

  return (
    <VStack w="100%" bg="white" spacing="16px">
      <VStack w="100%" h="300px" overflow="auto" spacing="8px">
        {missionExamples.map((mission) => (
          <Box
            key={mission.id}
            as="button"
            w="100%"
            p="12px 16px"
            pos="relative"
            layerStyle="body14Sbd"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="8px"
            textAlign="left"
            bg="white"
            onClick={() => handleClickMission(mission)}
            {...(selectedMissions.includes(mission) && {
              bgColor: 'blue.100',
              borderColor: 'polzzak.default',
              color: 'polzzak.default',
            })}
          >
            {mission.content}
            {selectedMissions.includes(mission) && (
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
      <Button
        pos="absolute"
        bottom="20px"
        variant="unstyled"
        w="calc(100% - 40px)"
        h="50px"
        p="12px 24px"
        bg="polzzak.default"
        isDisabled={selectedMissions.length === 0}
        onClick={handleClickAddButton}
      >
        <Text layerStyle="subtitle16Sbd" color="white">
          추가하기
        </Text>
      </Button>
    </VStack>
  );
};

export default MissionExamples;
