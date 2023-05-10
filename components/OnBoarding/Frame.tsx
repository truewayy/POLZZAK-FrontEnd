/* eslint-disable react/require-default-props */
import { Box, Text, VStack } from '@chakra-ui/react';

import { OnBoardingIcon } from '@/public/icon';

interface FrameProps {
  title: string;
  title2?: string;
  description: string;
  description2?: string;
}

const Frame = ({ title, title2, description, description2 }: FrameProps) => (
  <VStack w="100%" h="87vh" spacing="48px" p="15% 5%">
    <OnBoardingIcon w={244} h={205} />
    <Box w="100%">
      <Text layerStyle="head22B" alignSelf="flex-start" lineHeight="40px">
        {title}
      </Text>
      {title2 && (
        <Text layerStyle="head22B" alignSelf="flex-start">
          {title2}
        </Text>
      )}
    </Box>
    <Box w="100%" color="gray.600">
      <Text layerStyle="body15M" alignSelf="flex-start">
        {description}
      </Text>
      {description2 && (
        <Text layerStyle="body15M" alignSelf="flex-start">
          {description2}
        </Text>
      )}
    </Box>
  </VStack>
);

export default Frame;
