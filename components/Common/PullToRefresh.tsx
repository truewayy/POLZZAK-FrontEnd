import { Spinner, VStack } from '@chakra-ui/react';
import React, { FC } from 'react';

import usePullToRefresh from '@/hooks/usePullToRequest';

type PullToRefreshProps = {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
};

const PullToRefresh: FC<PullToRefreshProps> = ({ onRefresh, children }) => {
  const { isRefreshing, handleTouchStart, handleTouchMove, handleTouchEnd } =
    usePullToRefresh({ onRefresh });

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ overflowY: 'hidden' }}
    >
      {isRefreshing && (
        <VStack>
          <Spinner />
        </VStack>
      )}
      {children}
    </div>
  );
};

export default PullToRefresh;
