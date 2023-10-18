import {
  Button,
  Circle,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import { cancelRequest, searchFamilies, sendRequest } from '@/apis/family';
import { userInfo } from '@/apis/user';
import { BigSearchIcon } from '@/public/icon';

import ConfirmModal from '../ConfirmModal';

const SearchResult = () => {
  const { pathname, push } = useRouter();
  const toast = useToast();
  const [infoText, setInfoText] = useState('');
  const [infoText2, setInfoText2] = useState('');
  const [buttonMsg, setButtonMsg] = useState('연동 요청');
  const [buttonColor, setButtonColor] = useState({
    borderColor: 'polzzak.default',
    bgColor: 'polzzak.default',
    color: 'white',
  });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data: user } = useQuery(['userInfo'], userInfo);
  const memberType = user?.data?.memberType;

  const { query } = useRouter();
  const currentSearch = query.value as string;
  const { data, isLoading, refetch } = useQuery(
    ['search', currentSearch],
    () => searchFamilies(currentSearch),
    {
      enabled: !!currentSearch,
    }
  );
  const isPathOnboarding = pathname === '/find/family/search';
  const isRequestSent = data?.data?.familyStatus === 'SENT';

  const send = useMutation((targetId: number) => sendRequest(targetId), {
    onSuccess: () => {
      refetch();
      onClose();
    },
  });

  const cancel = useMutation((targetId: number) => cancelRequest(targetId), {
    onSuccess: () => {
      refetch();
      toast({
        title: '연동 요청이 취소되었습니다.',
        position: 'bottom',
        status: 'warning',
        duration: 3000,
        isClosable: false,
        containerStyle: {
          width: '90%',
        },
      });
    },
  });

  const handleClickCancelSearch = () => {
    if (isPathOnboarding) push('/find/family');
    else push('/link?tab=linked');
  };

  const handleClickButton = () => {
    if (data?.data?.familyStatus !== 'NONE') return;
    onOpen();
  };

  const handleClickConfirmButton = () => {
    if (!data?.data) return;
    send.mutate(data.data?.memberId);
  };

  useEffect(() => {
    const isKid = memberType?.name === 'KID';
    const text = isKid ? '연동된 보호자에게' : '연동된 아이에게';
    const text2 = isKid
      ? '칭찬 도장판을 받을 수 있어요'
      : '칭찬 도장판을 만들어 줄 수 있어요';

    setInfoText(text);
    setInfoText2(text2);
  }, [memberType]);

  useEffect(() => {
    const buttonStatusMsg = {
      NONE: '연동 요청',
      RECEIVED: '연동 요청',
      SENT: '연동 요청 완료!',
      APPROVE: '이미 연동됐어요',
    };

    const buttonStatusColor = {
      NONE: {
        borderColor: 'polzzak.default',
        bgColor: 'polzzak.default',
        color: 'white',
      },
      RECEIVED: {
        borderColor: 'polzzak.default',
        bgColor: 'polzzak.default',
        color: 'white',
      },
      SENT: {
        borderColor: 'polzzak.default',
        bgColor: 'white',
        color: 'polzzak.default',
      },
      APPROVE: {
        borderColor: '#C5C6D0',
        bgColor: 'white',
        color: '#C5C6D0',
      },
    };

    setButtonMsg(buttonStatusMsg[data?.data?.familyStatus || 'NONE']);
    setButtonColor(buttonStatusColor[data?.data?.familyStatus || 'NONE']);
  }, [data?.data?.familyStatus]);

  if (isLoading) {
    return (
      <VStack spacing="26px" justify="center" w="100%" h="300px">
        <Spinner
          speed="0.7s"
          color="rgba(89, 185, 255, 0.8)"
          emptyColor="rgba(89, 185, 255, 0.1)"
          thickness="5px"
          w="35px"
          h="35px"
        />
        <Text layerStyle="body14Md" textAlign="center">
          <Text as="span" layerStyle="body14Bd">
            {currentSearch}
          </Text>
          님을 <br />
          열심히 찾는 중이에요
        </Text>
        <Button
          h="32px"
          bg="polzzak.default"
          color="white"
          p="7.5px 36px"
          fontSize="12px"
          fontWeight="700"
          borderRadius="4px"
          onClick={handleClickCancelSearch}
        >
          취소
        </Button>
      </VStack>
    );
  }
  if (!currentSearch)
    return (
      <VStack spacing="16px" justify="center" w="100%" h="300px">
        <BigSearchIcon w="74px" h="74px" />
        <Text layerStyle="caption12Md" color="gray.500" textAlign="center">
          {infoText}
          <br />
          {infoText2}
        </Text>
      </VStack>
    );
  if (!data?.data)
    return (
      <VStack spacing="16px" justify="center" w="100%" h="300px">
        <BigSearchIcon w="74px" h="74px" />
        <Text layerStyle="body14Md" color="gray.700" textAlign="center">
          <Text as="span" layerStyle="body14Bd">
            {currentSearch}
          </Text>
          님을 <br />
          찾을 수 없어요
        </Text>
      </VStack>
    );
  return (
    <VStack justify="center" w="100%" h="300px" spacing="25px">
      <VStack spacing="10px">
        <Circle
          size={90}
          bgImage={`url(${data.data.profileUrl})`}
          bgSize="cover"
          bgPos="center"
        />
        <Text layerStyle="body14Bd" color="black" textAlign="center">
          {data.data.nickname}
        </Text>
      </VStack>
      <VStack spacing="16px">
        <Button
          variant="unstyled"
          p="0 24px"
          h="32px"
          border="1px solid"
          borderColor={buttonColor.borderColor}
          bg={buttonColor.bgColor}
          onClick={handleClickButton}
        >
          <Text
            layerStyle="caption12Bd"
            textAlign="center"
            color={buttonColor.color}
          >
            {buttonMsg}
          </Text>
        </Button>
        {isRequestSent && (
          <Text
            layerStyle="body13Md"
            textDecor="underline"
            color="gray.500"
            cursor="pointer"
            onClick={() => cancel.mutate(data.data.memberId)}
          >
            앗 실수, 요청 취소 할래요
          </Text>
        )}
      </VStack>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        handleClickCancelButton={onClose}
        handleClickConfirmButton={handleClickConfirmButton}
        isLoading={send.isLoading}
      >
        <Text layerStyle="body18Md" color="gray.700" textAlign="center">
          <Text as="span" layerStyle="body18Bd">
            {data.data.nickname}
          </Text>
          님에게
          <br />
          연동 요청을 보낼까요?
        </Text>
      </ConfirmModal>
    </VStack>
  );
};

export default SearchResult;
