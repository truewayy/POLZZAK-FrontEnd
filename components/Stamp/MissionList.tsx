import { Flex, Icon, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { ChevronDown, ChevronUp } from '@/public/icon';

interface MissionListProps {
  missions: { id: number; content: string }[] | undefined;
}

const MissionList = ({ missions }: MissionListProps) => {
  const [moreMission, setMoreMission] = useState(false);

  const showMoreMissionText = missions ? missions.length > 3 : false;

  const handleClickMoreButton = () => {
    setMoreMission(!moreMission);
  };

  return (
    <VStack w="100%" p="20px 5%" bg="#fff" spacing="23px">
      <Flex w="100%" justify="space-between" align="center">
        <Text layerStyle="subtitle16Sbd" color="rgba(46, 48, 56, 1)">
          미션 목록
        </Text>
        {showMoreMissionText && (
          <Text
            layerStyle="body13Md"
            color="gray.500"
            cursor="pointer"
            onClick={handleClickMoreButton}
          >
            더보기
            <Icon
              as={moreMission ? ChevronUp : ChevronDown}
              w="24px"
              h="24px"
            />
          </Text>
        )}
      </Flex>
      <VStack w="100%" spacing="18px">
        {moreMission
          ? missions?.map(({ id, content }) => (
              <Text w="100%" key={id} layerStyle="body14Md" color="#2E3038">
                {content}
              </Text>
            ))
          : missions?.slice(0, 3).map(({ id, content }) => (
              <Text w="100%" key={id} layerStyle="body14Md" color="#2E3038">
                {content}
              </Text>
            ))}
      </VStack>
    </VStack>
  );
};

export default MissionList;
