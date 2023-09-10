import { VStack } from '@chakra-ui/react';

import { CouponListData } from '@/apis/coupon';
import PullToRefresh from '@/components/Common/PullToRefresh/PullToRefresh';

import Card from './Card/Card';
import StampSwiper from './StampSwiper/StampSwiper';

interface CompletedCouponsVAProps {
  handleRefresh: () => Promise<any>;
  cards: CouponListData[] | undefined | null;
  filter: string;
}

const CompletedCouponsView = ({
  handleRefresh,
  cards,
  filter,
}: CompletedCouponsVAProps) => (
  <PullToRefresh onRefresh={handleRefresh}>
    {filter !== '전체' ? (
      <VStack w="100%" p="0 5%" spacing="20px">
        {cards?.[0].coupons.map(({ reward, rewardDate, couponId }) => (
          <Card
            key={reward}
            reward={reward}
            rewardDate={rewardDate}
            couponId={couponId}
          />
        ))}
      </VStack>
    ) : (
      cards?.map(({ family, coupons }) => (
        <StampSwiper key={family.memberId} family={family} coupons={coupons} />
      ))
    )}
  </PullToRefresh>
);

export default CompletedCouponsView;
