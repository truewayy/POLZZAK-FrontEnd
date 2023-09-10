import { Flex, useDisclosure, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import Sheet from 'react-modal-sheet';
import { useMutation, useQueryClient } from 'react-query';

import { createStamp, refuseMission } from '@/apis/stamp';
import { stampsExample } from '@/constants/defaultValue';
import { Notifications } from '@/public/icon';

import Loading from '../Common/Loading';
import ChooseMission from './ChooseMission';
import ChooseStamp from './ChooseStamp';
import StampCompleteModal from './StampCompleteModal';

interface StampRequestBoxProps {
  stampboardId: string;
  missionRequestList: {
    id: number;
    missionId: number;
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
  const [missionRequestId, setMissionRequestId] = useState<number>(0);

  const handleClickOpen = () => {
    setModalOn(true);
  };

  const onClose = () => {
    setModalOn(false);
    setSnapPoint(0);
  };

  const create = useMutation(
    () =>
      createStamp(
        Number(stampboardId),
        missionRequestId,
        missionId,
        stampDesignId
      ),
    {
      onSuccess: () => {
        stampCompleteModal.onOpen();
        queryClient.invalidateQueries('stampboard');
      },
    }
  );

  const refuse = useMutation((id: number) => refuseMission(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('stampboard');
    },
  });

  const handleClickRefuseButton = (requestId: number) => {
    refuse.mutate(requestId);
  };

  const handleClickCreateButton = () => {
    onClose();
    create.mutate();
  };

  const handleClickStampType = (id: number) => {
    setStampDesignId(id);
  };

  const handleClickRequestMission = (id: number, requestId: number) => {
    setMissionId(id);
    setMissionRequestId(requestId);
  };

  const handleClickNextButton = () => {
    setSnapPoint(1);
  };

  return (
    <>
      {create.isLoading && <Loading />}
      <Flex w="100%" pb="10px" cursor="pointer" onClick={handleClickOpen}>
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
                    missionRequestId={missionRequestId}
                    missionRequestList={missionRequestList}
                    handleClickRequestMission={handleClickRequestMission}
                    handleClickClose={onClose}
                    handleClickRefuseButton={handleClickRefuseButton}
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
        <StampCompleteModal
          isKid={false}
          guardianType={null}
          stampType={
            stampsExample.find(({ id }) => id === stampDesignId)?.content || ''
          }
          isOpen={stampCompleteModal.isOpen}
          onClose={stampCompleteModal.onClose}
        />
      </Flex>
    </>
  );
};
export default StampRequestBox;
