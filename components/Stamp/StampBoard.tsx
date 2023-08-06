/* eslint-disable react/no-array-index-key */
import {
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import Sheet from 'react-modal-sheet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';

import {
  createStamp,
  stampboardDetail,
  stampMissionRequest,
} from '@/apis/stamp';
import { stampsExample } from '@/constants/defaultValue';
import { ChevronDown, ChevronUp } from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';

import Loading from '../Common/Loading';
import ChooseMission from './ChooseMission';
import ChooseStamp from './ChooseStamp';
import StampCompleteModal from './StampCompleteModal';

interface BoardProps {
  stampboardId: string;
}

const board = {
  10: {
    row: 3,
    column: 4,
    foldedRow: 3,
  },
  12: {
    row: 3,
    column: 4,
    foldedRow: 3,
  },
  16: {
    row: 4,
    column: 4,
    foldedRow: 4,
  },
  20: {
    row: 5,
    column: 4,
    foldedRow: 5,
  },
  25: {
    row: 5,
    column: 5,
    foldedRow: 5,
  },
  36: {
    row: 6,
    column: 6,
    foldedRow: 6,
  },
  40: {
    row: 8,
    column: 5,
    foldedRow: 4,
  },
  48: {
    row: 8,
    column: 6,
    foldedRow: 5,
  },
  60: {
    row: 10,
    column: 6,
    foldedRow: 5,
  },
};

const StampBoard = ({ stampboardId }: BoardProps) => {
  const {
    memberType: { name },
    families,
  } = useRecoilValue(userInfoAtom);
  const queryClient = useQueryClient();
  const stampCompleteModal = useDisclosure();

  const [modalOn, setModalOn] = useState(false);
  const [moreStamp, setMoreStamp] = useState(false);
  const [snapPoint, setSnapPoint] = useState(0);
  const [stampDesignId, setStampDesignId] = useState<number>(1);
  const [missionId, setMissionId] = useState<number>(0);

  const { data } = useQuery(['stampboard', stampboardId], () =>
    stampboardDetail(stampboardId)
  );
  const stampboard = data?.data;
  const count = stampboard?.goalStampCount || 10;

  const isKid = name === 'KID';
  const guardianId = isKid ? families[0].memberId : 0;
  const guardianType = isKid ? families[0].memberType.detail : '';

  const stamps = () => {
    const extendedMissions = Array(count).fill(null);
    if (stampboard?.stamps) {
      for (let i = 0; i < stampboard.stamps.length; i += 1) {
        extendedMissions[i] = stampboard.stamps[i];
      }
    }
    return extendedMissions;
  };

  const showMoreStampText = count >= 40;

  const handleClickStamp = (
    stamp: {
      id: number;
      stampDesignId: number;
      missionContent: string;
      createdDate: string;
    } | null
  ) => {
    if (!stamp) setModalOn(true);
  };

  const handleClickMoreButton = () => {
    setMoreStamp(!moreStamp);
  };

  const onClose = () => {
    setModalOn(false);
    setSnapPoint(0);
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

  const request = useMutation(
    () => stampMissionRequest(Number(stampboardId), missionId, guardianId),
    {
      onSuccess: () => {
        stampCompleteModal.onOpen();
        queryClient.invalidateQueries('stampboard');
      },
    }
  );

  const handleClickMission = (id: number) => {
    setMissionId(id);
  };

  const handleClickNextButton = () => {
    if (isKid) {
      onClose();
      request.mutate();
    }
    if (!isKid) setSnapPoint(1);
  };

  const handleClickCreateButton = () => {
    onClose();
    create.mutate();
  };

  const handleClickStampType = (id: number) => {
    setStampDesignId(id);
  };

  return (
    <>
      {(request.isLoading || create.isLoading) && <Loading />}
      <VStack
        spacing="16px"
        w="100%"
        p="20px 22px"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="12px"
        bg="white"
      >
        <Grid
          templateColumns={`repeat(${board[count].column}, 1fr)`}
          templateRows={`repeat(${
            moreStamp ? board[count].row : board[count].foldedRow
          }, 1fr)`}
          w="100%"
          rowGap="16px"
          columnGap="12px"
        >
          {moreStamp
            ? stamps().map((stamp, i) => (
                <Button
                  variant="unstyled"
                  key={i}
                  pos="relative"
                  w="100%"
                  pt="100%"
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="gray.200"
                  color="gray.400"
                  cursor="pointer"
                  _hover={{ bg: 'blue.100', color: 'polzzak.highlighted' }}
                  _active={{ bg: 'blue.100', color: 'polzzak.highlighted' }}
                  isActive={stamp}
                  onClick={() => handleClickStamp(stamp)}
                >
                  <Text
                    pos="absolute"
                    lineHeight="100%"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                  >
                    {i + 1}
                  </Text>
                </Button>
              ))
            : stamps()
                .slice(0, board[count].foldedRow * board[count].column)
                .map((stamp, i) => (
                  <Button
                    variant="unstyled"
                    key={i}
                    pos="relative"
                    w="100%"
                    pt="100%"
                    borderRadius="50%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="gray.200"
                    color="gray.400"
                    cursor="pointer"
                    _hover={{ bg: 'blue.100', color: 'polzzak.highlighted' }}
                    _active={{ bg: 'blue.100', color: 'polzzak.highlighted' }}
                    isActive={stamp}
                    onClick={() => handleClickStamp(stamp)}
                  >
                    <Text
                      pos="absolute"
                      lineHeight="100%"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                    >
                      {i + 1}
                    </Text>
                  </Button>
                ))}
        </Grid>
        {showMoreStampText && (
          <Flex
            w="100%"
            p="19px 0 0"
            justifyContent="center"
            borderTop="1px solid"
            borderColor="gray.200"
          >
            <Text
              layerStyle="body13Md"
              color="gray.500"
              cursor="pointer"
              onClick={handleClickMoreButton}
            >
              {moreStamp ? '접기' : '더보기'}
              <Icon
                as={moreStamp ? ChevronUp : ChevronDown}
                w="24px"
                h="24px"
              />
            </Text>
          </Flex>
        )}
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
                    missions={stampboard?.missions || []}
                    missionId={missionId}
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
      </VStack>
      <StampCompleteModal
        isKid={isKid}
        stampType={
          stampsExample.find(({ id }) => id === stampDesignId)?.content || ''
        }
        guardianType={guardianType}
        isOpen={stampCompleteModal.isOpen}
        onClose={stampCompleteModal.onClose}
      />
    </>
  );
};

export default StampBoard;
