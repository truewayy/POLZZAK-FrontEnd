import 'swiper/css';
import 'swiper/css/pagination';

import { Button, Circle, Flex, Text, VStack } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
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
    if (stampDesignId === 1) return;
    handleClickStampType(stampDesignId - 1);
  };

  const handleClickNextArr = () => {
    swiperRef.current?.slideNext();
    if (stampDesignId === stampsExample.length) return;
    handleClickStampType(stampDesignId + 1);
  };

  const handleSlideRef = (swiper: Swiper) => {
    swiperRef.current = swiper;
  };

  useEffect(() => {
    swiperRef.current?.slideTo(stampDesignId - 1);
  }, [stampDesignId]);

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
        <Circle
          size="121px"
          bgImage={stampsExample.find(({ id }) => id === stampDesignId)?.icon}
          bgSize="contain"
          bgRepeat="no-repeat"
        />
        <Text layerStyle="subtitle16Sbd" color="gray.800">
          {stampsExample.find(({ id }) => id === stampDesignId)?.content}
        </Text>
      </VStack>
      <Flex w="100%" pos="relative">
        <LeftNavigation
          w="16px"
          h="16px"
          pos="absolute"
          fill="gray.400"
          left="0"
          top="50%"
          transform="translateY(-50%)"
          onClick={handleClickPrevArr}
        />
        <RightNavigation
          w="16px"
          h="16px"
          pos="absolute"
          fill="gray.400"
          right="0"
          top="50%"
          transform="translateY(-50%)"
          onClick={handleClickNextArr}
        />
        <SwiperComponent
          slidesPerView={5}
          style={{ width: '90%' }}
          onSwiper={handleSlideRef}
          initialSlide={stampDesignId - 1}
          centeredSlides
          slideToClickedSlide
          allowTouchMove={false}
        >
          {stampsExample.map(({ id, icon }) => (
            <SwiperSlide key={id}>
              <Flex w="100%" h="100%" justify="center" align="center">
                <Circle
                  boxSizing="content-box"
                  size="50px"
                  bg={`url(${icon})`}
                  bgSize="contain"
                  bgRepeat="no-repeat"
                  onClick={() => handleClickStampType(id)}
                  {...(stampDesignId === id && {
                    size: '60px',
                    border: '2px solid',
                    borderColor: 'polzzak.default',
                  })}
                />
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
          onClick={(e) => {
            e.stopPropagation();
            handleClickCreateButton();
          }}
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
