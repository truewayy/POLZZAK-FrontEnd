// Card.stories.tsx

import { ChakraProvider, VStack } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';

import Card, { CardProps } from '@/components/Main/ProgressingStamps/Card/Card';
import polzzakTheme from '@/public/theme/theme';

export default {
  title: 'Components/Card',
  component: Card,
} as Meta;

const Template: StoryFn<CardProps> = (args) => (
  <RecoilRoot>
    <ChakraProvider theme={polzzakTheme}>
      <VStack w="350px">
        <Card {...args} />
      </VStack>
    </ChakraProvider>
  </RecoilRoot>
);

export const Default = Template.bind({});
Default.args = {
  name: '가나다의 도장판',
  currentStampCount: 5,
  goalStampCount: 10,
  requestCount: 0,
  reward: 'Free coffee',
  isCouponIssued: false,
};

export const Complete = Template.bind({});
Complete.args = {
  name: 'Jane Smith',
  currentStampCount: 10,
  goalStampCount: 10,
  requestCount: 0,
  reward: 'Free sandwich',
  isCouponIssued: false,
};

export const Request = Template.bind({});
Request.args = {
  name: 'Bob Johnson',
  currentStampCount: 3,
  goalStampCount: 10,
  requestCount: 2,
  reward: 'Free cookie',
  isCouponIssued: false,
};

export const CouponIssued = Template.bind({});
CouponIssued.args = {
  name: 'Mary Lee',
  currentStampCount: 10,
  goalStampCount: 10,
  requestCount: 0,
  reward: 'Free pastry',
  isCouponIssued: true,
};
