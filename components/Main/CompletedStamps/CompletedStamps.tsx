import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { totalCompletedStampData } from '@/constants/defaultValue';
import { CompletedStampBoardPreview } from '@/interfaces/stampBoard';
import { filterAtom } from '@/store/filter';

import CompletedStampsSkeleton from './CompletedStampsSkeleton';
import CompletedStampsView from './CompletedStampsView';

interface StampData {
  nickname: string;
  stamps: CompletedStampBoardPreview[];
}

const CompletedStamps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCard] = useState<StampData[]>(totalCompletedStampData);
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
