/* eslint-disable react/require-default-props */
import { Button, Circle, Flex, Text, VStack } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { notiDeleteOnAtom, notificationsAtom } from '@/store/notifications';

interface NotificationFrameProps {
  id: number;
  emoticon: string;
  title: string;
  time: string;
  children: React.ReactNode;
  type: string;
  senderProfile?: string;
  sender: string;
}

const NotificationFrame = ({
  id,
  emoticon,
  title,
  time,
  children,
  type,
  senderProfile,
  sender,
}: NotificationFrameProps) => {
  const isDeleteModeOn = useRecoilValue(notiDeleteOnAtom);
  const [deleteArr, setDeleteArr] = useRecoilState(notificationsAtom);

  const isChecked = deleteArr.includes(id);

  const onClickCheckCircle = () => {
    if (isDeleteModeOn) {
      if (deleteArr.includes(id)) {
        setDeleteArr(deleteArr.filter((item) => item !== id));
      } else {
        setDeleteArr([...deleteArr, id]);
      }
    }
  };

  return (
    <VStack
      w="100%"
      p="16px"
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="8px"
      spacing="16px"
      {...(isDeleteModeOn &&
        isChecked && {
          bg: 'error.100',
          border: '1px solid',
          borderColor: 'error.500',
        })}
    >
      <VStack w="100%" spacing="8px" align="flex-start">
        <Flex w="100%" justify="space-between" align="center">
          <Flex gap="7px" justify="flex-start" align="center">
            <Text layerStyle="subtitle16Bd">
              <Text as="span" mr="4px">
                {emoticon}
              </Text>
              {title}
            </Text>
            <Circle size="4px" bg="gray.300" />
            <Text layerStyle="caption12Md" color="gray.500">
              {time}
            </Text>
          </Flex>
          {isDeleteModeOn && type !== 'linkRequest' && (
            <Circle
              size="16px"
              border="1.5px solid"
              borderColor="gray.500"
              cursor="pointer"
              {...(isChecked && {
                bg: 'error.500',
                borderColor: 'error.500',
                _after: {
                  content: '""',
                  display: 'block',
                  width: '7px',
                  height: '3px',
                  border: '2px solid white',
                  borderRadius: '0px',
                  borderTop: 'none',
                  borderRight: 'none',
                  transform: 'rotate(-45deg)',
                  transformOrigin: '40% 40%',
                },
              })}
              onClick={onClickCheckCircle}
            />
          )}
        </Flex>
        <Text layerStyle="body14Md" wordBreak="keep-all">
          {children}
        </Text>
      </VStack>
      {type === 'linkRequest' && (
        <Flex w="100%" gap="10px">
          <Button w="100%" p="8px 20px" bg="polzzak.default" borderRadius="8px">
            <Text layerStyle="body16Md" color="white">
              수락
            </Text>
          </Button>
          <Button w="100%" p="8px 20px" bg="error.500" borderRadius="8px">
            <Text layerStyle="body16Md" color="white">
              거절
            </Text>
          </Button>
        </Flex>
      )}
      <Flex w="100%" gap="4px" justify="flex-start" align="center">
        <Circle size="24px" bg={senderProfile ?? 'gray.300'} />
        <Text layerStyle="caption12Md" color="gray.500">
          {sender}
        </Text>
      </Flex>
    </VStack>
  );
};

export default NotificationFrame;