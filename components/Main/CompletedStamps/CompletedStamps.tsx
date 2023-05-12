import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { totalStampData } from '@/constants/defaultValue';
import { filterAtom } from '@/store/filter';
import { userInfoAtom } from '@/store/userInfo';

import CompletedStampsSkeleton from './CompletedStampsSkeleton';
import CompletedStampsView from './CompletedStampsView';

interface StampData {
  nickname: string;
  stamps: {
    completed: {
      id: number;
      title: string;
      reward: string;
    }[];
  };
}

const CompletedStamps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCard] = useState<StampData[]>(totalStampData);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const filter = useRecoilValue(filterAtom);

  const handleRefresh = async () => {
    try {
      const response: StampData[] = await axios.get('/api/stamp');
      setCard(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [filter]);

  useEffect(() => {
    if (!userInfo.chains.length) {
      setUserInfo({
        type: '',
        nickname: '',
        profileImage: '',
        chains: ['전체', '쿼카', '멜론수박', '아이유', '가나다라'],
      });
    }
  }, [userInfo, setUserInfo]);

  const CompletedStampsVAProps = {
    handleRefresh,
    cards,
    filter,
  };

  return isLoading ? (
    <CompletedStampsSkeleton filter={filter} />
  ) : (
    <CompletedStampsView {...CompletedStampsVAProps} />
  );
};

export default CompletedStamps;
