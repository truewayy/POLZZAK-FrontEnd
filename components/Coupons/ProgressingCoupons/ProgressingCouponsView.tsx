import 'swiper/css/pagination';

import { VStack } from '@chakra-ui/react';

import { CouponListData } from '@/apis/coupon';
import PullToRefresh from '@/components/Common/PullToRefresh/PullToRefresh';

import Card from './Card/Card';
import StampSwiper from './StampSwiper/StampSwiper';

interface ProgressingStampsVAProps {
  handleRefresh: () => Promise<any>;
  cards: CouponListData[] | undefined | null;
  filter: string;
}

const ProgressingCouponsView = ({
  handleRefresh,
  cards,
  filter,
}: ProgressingStampsVAProps) => (
  <PullToRefresh onRefresh={handleRefresh}>
    {filter !== '전체' ? (
      <VStack w="100%" p="0 5%" spacing="20px">
        {cards
          ?.find(({ family: { nickname } }) => nickname === filter)
          ?.coupons.map(({ reward, rewardDate }) => (
            <Card key={reward} reward={reward} rewardDate={rewardDate} />
          ))}
      </VStack>
    ) : (
      cards?.map(({ family, coupons }) => (
        <StampSwiper key={family.memberId} family={family} coupons={coupons} />
      ))
    )}
  </PullToRefresh>
);

export default ProgressingCouponsView;
