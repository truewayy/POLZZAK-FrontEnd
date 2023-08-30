import { Flex, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import { notificationList } from '@/apis/notifications';
import Notification from '@/components/Notifications/Notification';
import { Trash } from '@/public/icon';
import { notiDeleteOnAtom, notificationsAtom } from '@/store/notifications';

const Notifications = () => {
  const [startId, setStartId] = useState<number | null | undefined>(null);
  const [deleteModeOn, setDeleteModeOn] = useRecoilState(notiDeleteOnAtom);
  const [, setDeleteArr] = useRecoilState(notificationsAtom);
  const handleClickTrash = () => {
    setDeleteModeOn(!deleteModeOn);
    if (deleteModeOn) {
      setDeleteArr([]);
    }
  };

  const { data } = useInfiniteQuery(
    ['notifications'],
    ({ pageParam = 0 }) => notificationList(pageParam, startId),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.response.notificationDtoList.length === 10) {
          setStartId(lastPage?.response.startId);
          return {
            pageParam: lastPage.nextPage,
          };
        }
        return undefined;
      },
    }
  );
  console.log(data, startId);
  return (
    <VStack w="100%" minH="100vh" bg="gray.100" spacing="0px">
      <Flex w="100%" p="27px 0" bg="white" justify="center" pos="relative">
        <Text layerStyle="title22Sbd">알림</Text>
        {!deleteModeOn ? (
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
            >
              삭제
            </Text>
          </>
        )}
      </Flex>
      <VStack w="100%" p="15px 5% 100px 5%" spacing="8px">
        {data?.pages.map((notification) =>
          notification?.response.notificationDtoList.map((item) => (
            <Notification
              key={item.id}
              userType="GUARDIAN"
              notificationType="FAMILY_REQUEST"
            />
          ))
        )}
      </VStack>
    </VStack>
  );
};

export default Notifications;
