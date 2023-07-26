import { Flex, Text, VStack } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';

import Notification from '@/components/Notifications/Notification';
import { Trash } from '@/public/icon';
import { notiDeleteOnAtom, notificationsAtom } from '@/store/notifications';

const Notifications = () => {
  const [deleteModeOn, setDeleteModeOn] = useRecoilState(notiDeleteOnAtom);
  const [, setDeleteArr] = useRecoilState(notificationsAtom);
  const handleClickTrash = () => {
    setDeleteModeOn(!deleteModeOn);
    if (deleteModeOn) {
      setDeleteArr([]);
    }
  };
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
        <Notification userType="GUARDIAN" notificationType="linkRequest" />
        <Notification userType="GUARDIAN" notificationType="linkAccept" />
        <Notification userType="GUARDIAN" notificationType="levelUp" />
        <Notification userType="GUARDIAN" notificationType="levelDown" />
        <Notification userType="GUARDIAN" notificationType="stampRequest" />
        <Notification userType="GUARDIAN" notificationType="giftRequest" />
        <Notification
          userType="GUARDIAN"
          notificationType="stampboardComplete"
        />
        <Notification userType="GUARDIAN" notificationType="giftComplete" />
        <Notification userType="GUARDIAN" notificationType="giftDay" />
        <Notification userType="GUARDIAN" notificationType="giftNoGive" />
      </VStack>
    </VStack>
  );
};

export default Notifications;
