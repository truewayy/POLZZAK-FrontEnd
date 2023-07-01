import 'swiper/css';
import 'swiper/css/pagination';

import {
  Box,
  Button,
  Circle,
  Flex,
  Square,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Swiper from 'swiper';
import { Swiper as SwiperConponent, SwiperSlide } from 'swiper/react';

import { createStamp } from '@/apis/stamp';
import { CheckIcon, LeftNavigation, RightNavigation } from '@/public/icon';

import Timer from './Timer';

interface ParentStampModalProps {
  stampboardId: string;
  missions: {
    id: number;
    content: string;
  }[];
  missionRequestList: {
    id: number;
    missionId: number;
    missionContent: string;
    createdDate: string;
  }[];
  onClose: () => void;
  snapPoint: number;
  setSnapPoint: Dispatch<SetStateAction<number>>;
}

const tabStyle = {
  color: '#E6E4E2',
  _selected: {
    color: 'polzzak.default',
    borderBottom: '2px solid',
  },
  layerStyle: 'subtitle3',
  _disabled: {
    borderBottom: '2px solid #DADAE7',
    color: '#DADAE7',
    cursor: 'not-allowed',
  },
};

const stampsExample = [
  {
    id: 1,
    content: '참 잘했어요1',
  },
  {
    id: 2,
    content: '참 잘했어요2',
  },
  {
    id: 3,
    content: '참 잘했어요3',
  },
  {
    id: 4,
    content: '참 잘했어요4',
  },
  {
    id: 5,
    content: '참 잘했어요5',
  },
  {
    id: 6,
    content: '참 잘했어요6',
  },
  {
    id: 7,
    content: '참 잘했어요7',
  },
];

const ParentStampModal = ({
  stampboardId,
  missions,
  missionRequestList,
  onClose,
  snapPoint,
  setSnapPoint,
}: ParentStampModalProps) => {
  const swiperRef = useRef<Swiper>();
  const queryClient = useQueryClient();

  const [stampDesignId, setStampDesignId] = useState<number>(1);
  const [missionId, setMissionId] = useState<number>(0);

  const create = useMutation(
    () => createStamp(Number(stampboardId), 1, missionId, stampDesignId),
    {
      onSuccess: () => {
        setSnapPoint(2);
      },
    }
  );

  const handleSlideRef = (swiper: Swiper) => {
    swiperRef.current = swiper;
  };

  const handleClickMission = (id: number) => {
    setMissionId(id);
  };

  const handleClickNextButton = () => {
    setSnapPoint(1);
  };

  const handleClickCreateButton = () => {
    create.mutate();
  };

  const handleClickStamp = (id: number) => {
    setStampDesignId(id);
  };

  const handleClickPrevArr = () => {
    swiperRef.current?.slidePrev();
  };

  const handleClickNextArr = () => {
    swiperRef.current?.slideNext();
  };

  const handleCloseTimer = () => {
    queryClient.invalidateQueries('stampboard');
    onClose();
  };

  const getFormattedDate = (originalDate: string) =>
    new Date(originalDate).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
    });

  return (
    <VStack p="0 5%" w="100%" spacing="25px">
      {snapPoint === 0 && (
        <>
          <VStack w="100%" spacing="6px">
            <Text layerStyle="subtitle3" color="#2E3038">
              미션 선택 (택1)
            </Text>
            <Text layerStyle="body4" color="#9C9CA8">
              1/2
            </Text>
          </VStack>
          <Tabs w="100%" alignSelf="flex-start" borderColor="white">
            <TabList>
              <Tab {...tabStyle}>도장 요청 선택</Tab>
              <Tab {...tabStyle}>직접 선택</Tab>
            </TabList>
            <TabPanels w="100%">
              <TabPanel p="16px 0">
                <VStack w="100%" h="300px" overflowY="auto" spacing="8px">
                  {missionRequestList.map(
                    ({ id, missionContent, createdDate }) => (
                      <Flex
                        key={id}
                        justify="space-between"
                        w="100%"
                        p="12px 16px"
                        pos="relative"
                        layerStyle="body2"
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="8px"
                        textAlign="left"
                        onClick={() => handleClickMission(id)}
                        {...(missionId === id && {
                          bgColor: 'blue.100',
                          borderColor: 'polzzak.default',
                        })}
                      >
                        <Text>{missionContent}</Text>
                        <Flex gap="10px" align="center">
                          <Text layerStyle="caption2" color="gray.500">
                            {getFormattedDate(createdDate)}
                          </Text>
                          <Box
                            layerStyle="caption1"
                            p="3px 6px"
                            w="auto"
                            h="auto"
                            color="error.500"
                            border="1px solid rgba(255, 111, 80, 0.16)"
                            borderRadius="6px"
                            bg="error.100"
                            _active={{ bg: 'error.500', color: 'white' }}
                            _disabled={{
                              bg: 'rgba(255, 111, 80, 0.16)',
                              border: '1px solid rgba(255, 111, 80, 0.16)',
                              color: 'white',
                            }}
                          >
                            거절하기
                          </Box>
                        </Flex>
                      </Flex>
                    )
                  )}
                </VStack>
              </TabPanel>
              <TabPanel w="100%" p="16px 0">
                <VStack w="100%" h="200px" overflowY="auto" spacing="8px">
                  {missions.map(({ id, content }) => (
                    <Box
                      key={id}
                      as="button"
                      w="100%"
                      p="12px 16px"
                      pos="relative"
                      layerStyle="body2"
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="8px"
                      textAlign="left"
                      onClick={() => handleClickMission(id)}
                      {...(missionId === id && {
                        bgColor: 'blue.100',
                        borderColor: 'polzzak.default',
                        color: 'polzzak.default',
                      })}
                    >
                      {content}
                      {missionId === id && (
                        <CheckIcon
                          pos="absolute"
                          right="16px"
                          top="50%"
                          transform="translateY(-50%)"
                        />
                      )}
                    </Box>
                  ))}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Flex w="100%" p="0 5%" gap="7px" pos="absolute" bottom="20px">
            <Button
              variant="unstyled"
              bgColor="gray.300"
              h="50px"
              w="50%"
              borderRadius="8px"
              onClick={onClose}
            >
              <Text layerStyle="subtitle3" color="white" textAlign="center">
                선택 취소
              </Text>
            </Button>
            <Button
              variant="unstyled"
              bgColor="polzzak.default"
              h="50px"
              w="50%"
              borderRadius="8px"
              onClick={handleClickNextButton}
            >
              <Text layerStyle="subtitle3" color="white" textAlign="center">
                다음
              </Text>
            </Button>
          </Flex>
        </>
      )}
      {snapPoint === 1 && (
        <VStack w="100%" spacing="14px">
          <VStack w="100%" spacing="6px">
            <Text layerStyle="subtitle3" color="#2E3038">
              도장 선택
            </Text>
            <Text layerStyle="body4" color="#9C9CA8">
              2/2
            </Text>
          </VStack>
          <VStack w="100%" spacing="10px" pb="10px">
            <Circle size="121px" bg="gray.200" />
            <Text layerStyle="subtitle3" color="gray.800">
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
            <CustomSwiper
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
                      onClick={() => handleClickStamp(id)}
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
            </CustomSwiper>
          </Flex>
          <Flex w="100%" p="0 5%" gap="7px" pos="absolute" bottom="120px">
            <Button
              variant="unstyled"
              bgColor="gray.300"
              h="50px"
              w="50%"
              borderRadius="8px"
              onClick={() => setSnapPoint(0)}
            >
              <Text layerStyle="subtitle3" color="white" textAlign="center">
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
              <Text layerStyle="subtitle3" color="white" textAlign="center">
                도장 찍기
              </Text>
            </Button>
          </Flex>
        </VStack>
      )}
      {snapPoint === 2 && (
        <VStack w="100%" spacing="40px" pos="relative">
          <Box pos="absolute" top="0" right="0">
            <Timer count={3} onTimerEnd={handleCloseTimer} />
          </Box>
          <Text
            layerStyle="subtitle1"
            color="polzzak.highlighted"
            textAlign="center"
          >
            {stampsExample.find(({ id }) => id === stampDesignId)?.content}
            <br />
            <Text as="span" layerStyle="subtitle3" color="gray.800">
              도장이 찍혔어요!
            </Text>
          </Text>
          <Square size="200px" bg="gray.200" />
        </VStack>
      )}
    </VStack>
  );
};

export default ParentStampModal;

const CustomSwiper = styled(SwiperConponent)`
  .swiper-pagination {
    top: 10px;
    .swiper-pagination-progressbar {
      display: flex;
      gap: 5px;
    }
  }
`;
