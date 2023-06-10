import { Button, Circle, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { searchFamilies, sendRequest } from '@/apis/family';
import { BigSearchIcon } from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';

import ConfirmModal from '../ConfirmModal';

const SearchResult = () => {
  const [infoText, setInfoText] = useState('');
  const [infoText2, setInfoText2] = useState('');
  const [buttonMsg, setButtonMsg] = useState('연동 요청');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { memberType } = useRecoilValue(userInfoAtom);
  const { query } = useRouter();
  const currentSearch = query.value as string;
  const { data, isLoading, refetch } = useQuery(
    ['search', currentSearch],
    () => searchFamilies(currentSearch),
    {
      enabled: !!currentSearch,
    }
  );

  const send = useMutation((targetId: number) => sendRequest(targetId), {
    onSuccess: () => {
      refetch();
      onClose();
    },
  });

  const handleClickConfirmButton = () => {
    if (!data?.data) return;
    send.mutate(data.data?.memberId);
  };

  useEffect(() => {
    const isKid = memberType.name === 'KID';
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

    setButtonMsg(buttonStatusMsg[data?.data?.familyStatus || 'NONE']);
  }, [data?.data?.familyStatus]);

  if (isLoading) {
    return (
      <VStack spacing="16px" justify="center" w="100%" h="300px">
        <Text>
          {currentSearch}님을 <br />
          열심히 찾는 중이에요
        </Text>
      </VStack>
    );
  }
  if (!currentSearch)
    return (
      <VStack spacing="16px" justify="center" w="100%" h="300px">
        <BigSearchIcon w="74px" h="74px" />
        <Text layerStyle="caption2" color="gray.500" textAlign="center">
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
        <Text layerStyle="body5" color="gray.700" textAlign="center">
          {currentSearch}님을 <br />
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
        <Text layerStyle="body5" color="black" textAlign="center">
          {data.data.nickname}
        </Text>
      </VStack>
      <Button
        variant="unstyled"
        bgColor="polzzak.default"
        h="32px"
        w="91px"
        onClick={onOpen}
      >
        <Text layerStyle="caption12B" color="white" textAlign="center">
          {buttonMsg}
        </Text>
      </Button>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        handleClickCancelButton={onClose}
        handleClickConfirmButton={handleClickConfirmButton}
        isLoading={send.isLoading}
      >
        <Text layerStyle="body7" color="gray.700" textAlign="center">
          <Text as="span" layerStyle="body6">
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
