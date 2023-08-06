import { Box, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { stampboardDetail } from '@/apis/stamp';
import Header from '@/components/Stamp/Header';
import MissionList from '@/components/Stamp/MissionList';
import Nav from '@/components/Stamp/Nav';
import StampBoard from '@/components/Stamp/StampBoard';
import { userInfoAtom } from '@/store/userInfo';

interface StampboardProps {
  stampboardId: string;
}

const StampRequestBox = dynamic(
  () => import('@/components/Stamp/StampRequestBox'),
  {
    ssr: false,
  }
);

const RewardBox = dynamic(() => import('@/components/Stamp/RewardBox'), {
  ssr: false,
});

const Stampboard = ({ stampboardId }: StampboardProps) => {
  const {
    memberType: { name },
  } = useRecoilValue(userInfoAtom);
  const { data } = useQuery(['stampboard', stampboardId], () =>
    stampboardDetail(stampboardId)
  );

  const stampboard = data?.data;
  const isMissionRequest = !!stampboard?.missionRequestList.length;
  const createdDate = new Date(stampboard?.createdDate ?? '');
  const completedDate = new Date(stampboard?.completedDate ?? '');
  const currentDate = new Date();

  const dateDiff = (date1: Date, date2: Date) => {
    const diff = Math.ceil(
      (date1.getTime() - date2.getTime()) / (1000 * 3600 * 24)
    );
    return diff;
  };

  const progressingDate = dateDiff(currentDate, createdDate);
  const completingDate = dateDiff(completedDate, createdDate);

  const isMemberTypeKid = name === 'KID';
  const isCompleted = stampboard?.status !== 'progress';

  return (
    <VStack w="100%" h="100%" spacing="0">
      <VStack w="100%" p="20px 5%" bg="#F8F8FC">
        <Nav />
        <Header
          stampboardName={stampboard?.name ?? ''}
          isCompleted={isCompleted}
          completingDate={completingDate}
          progressingDate={progressingDate}
        />
        {!isMemberTypeKid && isMissionRequest && (
          <StampRequestBox
            stampboardId={stampboardId}
            missionRequestList={stampboard.missionRequestList || []}
          />
        )}
        <StampBoard stampboardId={stampboardId} />
      </VStack>
      <MissionList missions={stampboard?.missions} />
      <Box w="100%" h="8px" bg="#F8F8FC" />
      <RewardBox stampboardId={stampboardId} />
    </VStack>
  );
};

export default Stampboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { stampboardId } = context.query;
  return {
    props: {
      stampboardId,
    },
  };
};
