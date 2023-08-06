import { VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';

import { createStamp, stampMissionRequest } from '@/apis/stamp';
import { userInfoAtom } from '@/store/userInfo';

import ChooseMission from './ChooseMission';
import ChooseStamp from './ChooseStamp';

interface ParentStampModalProps {
  stampboardId: string;
  missions: {
    id: number;
    content: string;
  }[];
  onClose: () => void;
  snapPoint: number;
  setSnapPoint: Dispatch<SetStateAction<number>>;
}

const ParentStampModal = ({
  stampboardId,
  missions,
  onClose,
  snapPoint,
  setSnapPoint,
}: ParentStampModalProps) => {
  const {
    memberType: { name },
    families,
  } = useRecoilValue(userInfoAtom);

  const isKid = name === 'KID';
  const guardianId = isKid ? families[0].memberId : 0;
  const guardianType = isKid ? families[0].memberType.detail : '';

  const queryClient = useQueryClient();

  const [stampDesignId, setStampDesignId] = useState<number>(1);
  const [missionId, setMissionId] = useState<number>(0);

  const create = useMutation(
    () => createStamp(Number(stampboardId), 1, missionId, stampDesignId),
    {
      onSuccess: () => {
        setSnapPoint(2);
      },
    }
  );

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

  const handleClickNextButton = () => {
    if (isKid) {
      request.mutate();
      queryClient.invalidateQueries('stampboard');
    }
    if (!isKid) setSnapPoint(1);
  };

  const handleClickCreateButton = () => {
    create.mutate();
  };

  const handleClickStampType = (id: number) => {
    setStampDesignId(id);
  };

  return (
    <VStack p="0 5%" w="100%" spacing="25px">
      {snapPoint === 0 && (
        <ChooseMission
          missions={missions}
          missionId={missionId}
          missionRequestList={[]}
          handleClickMission={handleClickMission}
          handleClickClose={onClose}
          handleClickNextButton={handleClickNextButton}
        />
      )}
      {snapPoint === 1 && (
        <ChooseStamp
          stampDesignId={stampDesignId}
          handleClickStampType={handleClickStampType}
          handleClickCreateButton={handleClickCreateButton}
          handleClickPrevButton={() => setSnapPoint(0)}
        />
      )}
    </VStack>
  );
};

export default ParentStampModal;
