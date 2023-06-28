/* eslint-disable react/no-array-index-key */
import { Box, Button, Grid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import Sheet from 'react-modal-sheet';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { stampboardDetail } from '@/apis/stamp';
import { userInfoAtom } from '@/store/userInfo';

import KidStampModal from './KidStampModal';

interface BoardProps {
  stampboardId: string;
}

const board = {
  10: {
    row: 3,
    column: 4,
  },
  12: {
    row: 3,
    column: 4,
  },
  16: {
    row: 4,
    column: 4,
  },
  20: {
    row: 5,
    column: 4,
  },
  25: {
    row: 5,
    column: 5,
  },
  36: {
    row: 6,
    column: 6,
  },
  40: {
    row: 8,
    column: 5,
  },
  48: {
    row: 8,
    column: 6,
  },
  60: {
    row: 10,
    column: 6,
  },
};

const StampBoard = ({ stampboardId }: BoardProps) => {
  const {
    memberType: { name },
    families,
  } = useRecoilValue(userInfoAtom);
  const [modalOn, setModalOn] = useState(false);
  const [snapPoint, setSnapPoint] = useState(0);

  const { data } = useQuery(['stampboard', stampboardId], () =>
    stampboardDetail(stampboardId)
  );
  const stampboard = data?.data;
  const count = stampboard?.goalStampCount || 10;

  const isMemberTypeKid = name === 'KID';
  const guardianId = isMemberTypeKid ? families[0].memberId : 0;
  const guardianType = isMemberTypeKid ? families[0].memberType.detail : '';

  const handleClickStamp = () => {
    setModalOn(true);
  };

  const onClose = () => {
    setModalOn(false);
    setSnapPoint(0);
  };

  return (
    <Grid
      templateColumns={`repeat(${board[count].column}, 1fr)`}
      templateRows={`repeat(${board[count].row}, 1fr)`}
      w="100%"
      p="20px 22px"
      rowGap="16px"
      columnGap="12px"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="12px"
      bg="white"
    >
      {[...Array(count)].map((_, i) => (
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
          onClick={handleClickStamp}
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
      <Sheet
        isOpen={modalOn}
        onClose={onClose}
        snapPoints={[550, 450, 200, 0]}
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
            {isMemberTypeKid ? (
              <KidStampModal
                guardianId={guardianId}
                guardianType={guardianType}
                stampboardId={stampboardId}
                missions={stampboard?.missions || []}
                onClose={onClose}
                snapPoint={snapPoint}
                setSnapPoint={setSnapPoint}
              />
            ) : (
              <Box />
            )}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop
          onTap={onClose}
          style={{ background: 'rgba(0, 0, 0, 0.4)' }}
        />
      </Sheet>
    </Grid>
  );
};

export default StampBoard;
