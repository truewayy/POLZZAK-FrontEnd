import { Box, ChakraProvider } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';

import polzzakTheme from '@/public/theme/theme';

import LoginButton, { LoginButtonProps } from '../components/Login/Button';

export default {
  title: 'Components/LoginButton',
  component: LoginButton,
} as Meta;

const Template: StoryFn<LoginButtonProps> = (args) => (
  <ChakraProvider theme={polzzakTheme}>
    <Box w={300}>
      <LoginButton {...args} />
    </Box>
  </ChakraProvider>
);

export const Kakao = Template.bind({});
Kakao.args = {
  type: 'kakao',
};

export const Google = Template.bind({});
Google.args = {
  type: 'google',
};
