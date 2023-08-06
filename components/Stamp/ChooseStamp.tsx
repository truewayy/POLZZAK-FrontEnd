import 'swiper/css';
import 'swiper/css/pagination';

import { Button, Circle, Flex, Text, VStack } from '@chakra-ui/react';
import { useRef } from 'react';
import Swiper from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

import { stampsExample } from '@/constants/defaultValue';
import { LeftNavigation, RightNavigation } from '@/public/icon';

interface ChooseStampProps {
  stampDesignId: number;
  handleClickStampType: (stampId: number) => void;
  handleClickPrevButton: () => void;
  handleClickCreateButton: () => void;
}

const ChooseStamp = ({
  stampDesignId,
  handleClickStampType,
  handleClickPrevButton,
  handleClickCreateButton,
}: ChooseStampProps) => {
  const swiperRef = useRef<Swiper>();

  const handleClickPrevArr = () => {
    swiperRef.current?.slidePrev();
  };

  const handleClickNextArr = () => {
    swiperRef.current?.slideNext();
  };

  const handleSlideRef = (swiper: Swiper) => {
    swiperRef.current = swiper;
  };

  return (
    <VStack w="100%" spacing="14px">
      <VStack w="100%" spacing="6px">
        <Text layerStyle="subtitle16Sbd" color="#2E3038">
          도장 선택
        </Text>
        <Text layerStyle="body13Md" color="#9C9CA8">
          2/2
        </Text>
      </VStack>
      <VStack w="100%" spacing="10px" pb="10px">
        <Circle size="121px" bg="gray.200" />
        <Text layerStyle="subtitle16Sbd" color="gray.800">
          {stampsExample.find(({ id }) => id === stampDesignId)?.content}
        </Text>
      </VStack>
      <Flex w="100%" pos="relative">
        <LeftNavigation
          w="16px"
          h="16px"
          pos="absolute"
          left="0"
          top="50%"
          transform="translateY(-50%)"
          onClick={handleClickPrevArr}
        />
        <RightNavigation
          w="16px"
          h="16px"
          pos="absolute"
          right="0"
          top="50%"
          transform="translateY(-50%)"
          onClick={handleClickNextArr}
        />
        <SwiperComponent
          grabCursor
          slidesPerView={5}
          style={{ width: '90%' }}
          onSwiper={handleSlideRef}
        >
          {stampsExample.map(({ id }) => (
            <SwiperSlide key={id}>
              <Flex w="100%" h="100%" justify="center" align="center">
                <Circle
                  size="50px"
                  bg="gray.200"
                  onClick={() => handleClickStampType(id)}
                  {...(stampDesignId === id && {
                    bg: 'polzzak.default',
                    color: 'white',
                  })}
                >
                  {id}
                </Circle>
              </Flex>
            </SwiperSlide>
          ))}
        </SwiperComponent>
      </Flex>
      <Flex w="100%" p="0 5%" gap="7px" pos="absolute" bottom="120px">
        <Button
          variant="unstyled"
          bgColor="gray.300"
          h="50px"
          w="50%"
          borderRadius="8px"
          onClick={handleClickPrevButton}
        >
          <Text layerStyle="subtitle16Sbd" color="white" textAlign="center">
            이전
          </Text>
        </Button>
        <Button
          variant="unstyled"
          bgColor="polzzak.default"
          h="50px"
          w="50%"
          borderRadius="8px"
          onClick={handleClickCreateButton}
        >
          <Text layerStyle="subtitle16Sbd" color="white" textAlign="center">
            도장 찍기
          </Text>
        </Button>
      </Flex>
    </VStack>
  );
};

export default ChooseStamp;
