import { GetServerSidePropsContext } from 'next';

import SwiperContent from '@/components/OnBoarding/SwiperContent/SwiperContent';

interface OnBoardingProps {
  type: 'kid' | 'parent';
}

const OnBoarding = ({ type }: OnBoardingProps) => <SwiperContent type={type} />;

export default OnBoarding;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { type } = context.query;

  if (type !== 'kid' && type !== 'parent') {
    return {
      redirect: {
        destination: '/onboarding/kid',
        permanent: false,
      },
    };
  }

  return {
    props: {
      type,
    },
  };
};
