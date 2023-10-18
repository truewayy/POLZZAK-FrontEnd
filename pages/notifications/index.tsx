/* eslint-disable no-nested-ternary */
import { Flex, Skeleton, Text, VStack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { InfiniteData, useInfiniteQuery, useMutation } from 'react-query';
import { useRecoilState } from 'recoil';

import {
  deleteNotification,
  Notification as NotifiType,
  notificationList,
} from '@/apis/notifications';
import { Trash } from '@/public/icon';
import { notiDeleteOnAtom, notificationsAtom } from '@/store/notifications';

const Notification = dynamic(
  () => import('@/components/Notifications/Notification'),
  {
    ssr: false,
  }
);

const Notifications = () => {
  const [startId, setStartId] = useState<number | null | undefined>(null);
  const [deleteModeOn, setDeleteModeOn] = useRecoilState(notiDeleteOnAtom);
  const [notificationArr, setNotificationArr] = useState<
    InfiniteData<
      | {
          response: {
            startId: number;
            notificationDtoList: NotifiType[];
          };
          nextPage: number;
        }
      | undefined
    >
  >();

  const [deleteArr, setDeleteArr] = useRecoilState(notificationsAtom);
  const handleClickTrash = () => {
    setDeleteModeOn(!deleteModeOn);
    if (deleteModeOn) {
      setDeleteArr([]);
    }
  };

  const { data, isLoading, refetch } = useInfiniteQuery(
    ['notifications'],
    ({ pageParam = 0 }) => notificationList(pageParam, startId),
    {
      onSuccess: (res) => {
        setNotificationArr(res);
      },
      getNextPageParam: (lastPage) => {
        if (lastPage?.response.notificationDtoList.length === 10) {
          return {
            pageParam: lastPage.nextPage,
          };
        }
        return undefined;
      },
    }
  );

  const { mutate: deleteNotifications } = useMutation(
    (notifications: string) => deleteNotification(notifications),
    {
      onSuccess: () => {
        setDeleteModeOn(false);
        setDeleteArr([]);
        setStartId(null);
        refetch();
      },
    }
  );

  const noNotifications = !data?.pages[0]?.response?.notificationDtoList.length;

  useEffect(() => {
    setStartId(data?.pages[0]?.response.startId);
  }, [data]);

  return (
    <VStack w="100%" minH="100vh" bg="gray.100" spacing="0px">
      <Flex w="100%" p="27px 0" bg="white" justify="center" pos="relative">
        <Text layerStyle="title22Sbd">알림</Text>
        {!deleteModeOn ? (
          !noNotifications && (
            <Trash
              pos="absolute"
              w="22px"
              h="22px"
              right="5%"
              top="50%"
              transform="translateY(-50%)"
              cursor="pointer"
              onClick={handleClickTrash}
            />
          )
        ) : (
          <>
            <Text
              pos="absolute"
              left="5%"
              top="50%"
              transform="translateY(-50%)"
              layerStyle="body15Md"
              color="gray.400"
              cursor="pointer"
              onClick={handleClickTrash}
            >
              취소
            </Text>
            <Text
              pos="absolute"
              right="5%"
              top="50%"
              transform="translateY(-50%)"
              layerStyle="body15Md"
              cursor="pointer"
              color="error.500"
              onClick={() => deleteNotifications(deleteArr.join(','))}
            >
              삭제
            </Text>
          </>
        )}
      </Flex>
      <VStack w="100%" p="15px 5% 100px 5%" spacing="8px">
        {isLoading ? (
          <>
            <Skeleton h="180px" w="100%" borderRadius="8px" />
            <Skeleton h="180px" w="100%" borderRadius="8px" />
            <Skeleton h="180px" w="100%" borderRadius="8px" />
            <Skeleton h="180px" w="100%" borderRadius="8px" />
            <Skeleton h="180px" w="100%" borderRadius="8px" />
          </>
        ) : noNotifications ? (
          <VStack w="100%" h="550px" justify="center" align="center">
            <Text layerStyle="subtitle20Rg" color="gray.400">
              알림이 없어요
            </Text>
          </VStack>
        ) : (
          notificationArr?.pages.map((notification) =>
            notification?.response.notificationDtoList.map((item) => (
              <Notification key={item.id} notification={item} />
            ))
          )
        )}
      </VStack>
    </VStack>
  );
};

export default Notifications;
