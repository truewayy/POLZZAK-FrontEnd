import { Text, VStack } from '@chakra-ui/react';

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
        {cards?.[0].coupons.length === 0 ? (
          <VStack
            w="100%"
            m="0 7%"
            mb="30px"
            bg="white"
            h="180px"
            border="1px dashed #DADAE7"
            borderRadius="8px"
            justifyContent="center"
          >
            <Text layerStyle="body14Md" textAlign="center" color="gray.700">
              쿠폰이 없어요
            </Text>
          </VStack>
        ) : (
          cards?.[0].coupons.map((card) => (
            <Card key={card.couponId} {...card} />
          ))
        )}
      </VStack>
    ) : (
      cards?.map(({ family, coupons }) => (
        <StampSwiper key={family.memberId} family={family} coupons={coupons} />
      ))
    )}
  </PullToRefresh>
);

export default CompletedCouponsView;
