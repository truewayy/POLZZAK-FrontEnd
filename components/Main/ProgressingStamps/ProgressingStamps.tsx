import 'react-spring-bottom-sheet/dist/style.css';
import 'swiper/css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { totalProgressingStampData } from '@/constants/defaultValue';
import { ProcessingStampBoardPreview } from '@/interfaces/stampBoard';
import { filterAtom } from '@/store/filter';
import { userInfoAtom } from '@/store/userInfo';

import ProgressingStampsSkeleton from './ProgressingStampsSkeleton';
import ProgressingStampsView from './ProgressingStampsView';

interface StampData {
  nickname: string;
  stamps: ProcessingStampBoardPreview[];
}

const ProgressingStamps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCard] = useState<StampData[]>(totalProgressingStampData);
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

  const ProgressingStampsVAProps = {
    handleRefresh,
    cards,
    filter,
  };

  return isLoading ? (
    <ProgressingStampsSkeleton filter={filter} />
  ) : (
    <ProgressingStampsView {...ProgressingStampsVAProps} />
  );
};

export default ProgressingStamps;
