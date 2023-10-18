/* eslint-disable react/require-default-props */
import { Box, Image, Text, VStack } from '@chakra-ui/react';

interface FrameProps {
  title: string;
  title2?: string;
  description: string;
  description2?: string;
  icon: string;
}

const Frame = ({
  title,
  title2,
  description,
  description2,
  icon,
}: FrameProps) => (
  <VStack w="100%" h="87vh" spacing="48px" p="15% 5%">
    <Image
      src={icon}
      w="256px"
      h="256px"
      objectFit="contain"
      objectPosition="center"
    />
    <Box w="100%">
      <Text layerStyle="title22Bd" alignSelf="flex-start" lineHeight="40px">
        {title}
      </Text>
      {title2 && (
        <Text layerStyle="title22Bd" alignSelf="flex-start">
          {title2}
        </Text>
      )}
    </Box>
    <Box w="100%" color="gray.600">
      <Text layerStyle="body15Md" alignSelf="flex-start">
        {description}
      </Text>
      {description2 && (
        <Text layerStyle="body15Md" alignSelf="flex-start">
          {description2}
        </Text>
      )}
    </Box>
  </VStack>
);

export default Frame;
