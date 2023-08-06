import { Flex, useDisclosure, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import Sheet from 'react-modal-sheet';
import { useMutation, useQueryClient } from 'react-query';

import { createStamp } from '@/apis/stamp';
import { Notifications } from '@/public/icon';

import ChooseMission from './ChooseMission';
import ChooseStamp from './ChooseStamp';

interface StampRequestBoxProps {
  stampboardId: string;
  missionRequestList: {
    id: number;
    missionContent: string;
    createdDate: string;
  }[];
}

const StampRequestBox = ({
  stampboardId,
  missionRequestList,
}: StampRequestBoxProps) => {
  const queryClient = useQueryClient();
  const stampCompleteModal = useDisclosure();

  const [modalOn, setModalOn] = useState(false);
  const [snapPoint, setSnapPoint] = useState(0);
  const [stampDesignId, setStampDesignId] = useState<number>(1);
  const [missionId, setMissionId] = useState<number>(0);

  const handleClickOpen = () => {
    setModalOn(true);
  };

  const onClose = () => {
    setModalOn(false);
  };

  const create = useMutation(
    () => createStamp(Number(stampboardId), 1, missionId, stampDesignId),
    {
      onSuccess: () => {
        stampCompleteModal.onOpen();
        queryClient.invalidateQueries('stampboard');
      },
    }
  );

  const handleClickCreateButton = () => {
    onClose();
    create.mutate();
  };

  const handleClickStampType = (id: number) => {
    setStampDesignId(id);
  };

  const handleClickMission = (id: number) => {
    setMissionId(id);
  };

  const handleClickNextButton = () => {
    setSnapPoint(1);
  };

  return (
    <Flex w="100%" pb="10px" onClick={handleClickOpen}>
      <Flex
        w="100%"
        p="12px 16px"
        align="center"
        bg="#F0F7FF"
        layerStyle="body14Sbd"
        color="polzzak.highlighted"
        border="1px solid rgba(13, 122, 211, 0.16)"
        borderRadius="8px"
        gap="8px"
      >
        <Notifications w="20px" h="20px" /> 도장 요청이 있어요!
      </Flex>
      <Sheet
        isOpen={modalOn}
        onClose={onClose}
        snapPoints={[550, 450, 450, 0]}
        initialSnap={snapPoint}
        style={{
          maxWidth: '560px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content style={{ position: 'relative' }}>
            <VStack p="0 5%" w="100%" spacing="25px">
              {snapPoint === 0 && (
                <ChooseMission
                  isRequest
                  missionId={missionId}
                  missionRequestList={missionRequestList}
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
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop
          onTap={onClose}
          style={{ background: 'rgba(0, 0, 0, 0.4)' }}
        />
      </Sheet>
    </Flex>
  );
};
export default StampRequestBox;
