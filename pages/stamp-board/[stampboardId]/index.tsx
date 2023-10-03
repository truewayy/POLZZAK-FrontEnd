import { Box, VStack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { stampboardDetail } from '@/apis/stamp';
import { userInfo } from '@/apis/user';
import Header from '@/components/Stamp/Header';
import MissionList from '@/components/Stamp/MissionList';
import Nav from '@/components/Stamp/Nav';
import StampBoard from '@/components/Stamp/StampBoard';

const StampRequestBox = dynamic(
  () => import('@/components/Stamp/StampRequestBox'),
  {
    ssr: false,
  }
);

const RewardBox = dynamic(() => import('@/components/Stamp/RewardBox'), {
  ssr: false,
});

const Stampboard = () => {
  const { query } = useRouter();
  const stampboardId = query.stampboardId as string;
  const { data: user } = useQuery(['userInfo'], userInfo);
  const name = user?.data?.memberType.name;

  const { data } = useQuery(
    ['stampboard', stampboardId],
    () => stampboardDetail(stampboardId),
    {
      enabled: !!stampboardId,
    }
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
        <Nav isCompleted={isCompleted} />
        <Header
          stampboardName={stampboard?.name ?? ''}
          isCompleted={isCompleted}
          completingDate={completingDate}
          progressingDate={progressingDate}
        />
        {!isMemberTypeKid && isMissionRequest && !isCompleted && (
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
