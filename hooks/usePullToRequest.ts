import { TouchEventHandler, useState } from 'react';

type UsePullToRefreshProps = {
  onRefresh: () => Promise<void>;
};

type UsePullToRefreshReturnType = {
  isRefreshing: boolean;
  handleTouchStart: TouchEventHandler<HTMLDivElement>;
  handleTouchMove: TouchEventHandler<HTMLDivElement>;
  handleTouchEnd: () => void;
};

const usePullToRefresh = ({
  onRefresh,
}: UsePullToRefreshProps): UsePullToRefreshReturnType => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
    setStartY(event.touches[0].clientY);
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = async (event) => {
    const currentY = event.touches[0].clientY;
    const distance = currentY - startY;

    if (distance > 100 && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setTimeout(() => {
        setIsRefreshing(false);
      }, 500);
    }
  };

  const handleTouchEnd = () => {
    setStartY(0);
  };

  return {
    isRefreshing,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default usePullToRefresh;
