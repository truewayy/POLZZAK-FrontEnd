/* eslint-disable no-nested-ternary */
import { Box, Circle, Flex, Text, VStack } from '@chakra-ui/react';

import { Barcodes } from '@/public/icon';

interface CardVAProps {
  reward: string;
  handleClickCard: () => void;
}

const CardView = ({ reward, handleClickCard }: CardVAProps) => (
  <Flex
    w="100%"
    minH="180px"
    pos="relative"
    cursor="pointer"
    onClick={handleClickCard}
  >
    <Box
      pos="absolute"
      top="0px"
      left="0px"
      w="100%"
      h="100%"
      bg="#000000B2"
      opacity="0.6"
      borderRadius="8px"
      zIndex="1"
    />
    <Box
      w="130px"
      h="78px"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      bg="polzzak.default"
      color="white"
      pos="absolute"
      right="30px"
      bottom="30px"
      zIndex="2"
      transform="rotate(-10deg)"
      borderRadius="12px"
      layerStyle="title20Bd"
    >
      <Text as="span" layerStyle="title24Sbd" color="white">
        선물
      </Text>
      전달 완료!
    </Box>
    <VStack
      w="70%"
      p="16px 16px 24px 16px"
      align="flex-start"
      justify="space-between"
      bg="white"
      borderRadius="8px 0 0 8px"
    >
      <VStack spacing="8px" align="flex-start">
        <Text layerStyle="subtitle16Sbd" color="#000">
          {reward}
        </Text>
      </VStack>
    </VStack>
    <VStack
      w="30%"
      borderRadius="0 8px 8px 0"
      pos="relative"
      bg="blue.400"
      p="15px 27px"
      justify="flex-end"
      spacing="0"
    >
      <Barcodes w="60px" h="50px" />
      <Circle
        size="29px"
        pos="absolute"
        top="50%"
        left="-13px"
        transform="translateY(-50%)"
        bg="blue.400"
      />
    </VStack>
  </Flex>
);

export default CardView;
