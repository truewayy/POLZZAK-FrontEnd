import { Circle, Flex, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { cancelRequest, familiesInfo } from '@/apis/family';
import { TOKEN_KEY } from '@/constants/auth';
import { XIcon } from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';
import { getLocalStorage } from '@/utils/storage';

import ConfirmModal from './ConfirmModal';

const LinkedFamily = () => {
  const clearModal = useDisclosure();
  const [userType, setUserType] = useState('');
  const [selected, setSelected] = useState({
    memberId: 0,
    nickname: '',
  });
  const {
    memberType: { name },
  } = useRecoilValue(userInfoAtom);
  const { query } = useRouter();

  const tab = query.tab as string;
  const token = getLocalStorage(TOKEN_KEY);

  const enableFetch = tab === 'linked' && !!token;

  const { data: family, refetch: familyRefetch } = useQuery(
    ['familes', 'list'],
    familiesInfo,
    {
      enabled: enableFetch,
    }
  );

  const clear = useMutation((targetId: number) => cancelRequest(targetId), {
    onSuccess: () => {
      familyRefetch();
      clearModal.onClose();
    },
  });

  const handleClickConfirmClearButton = () => {
    if (!family?.data) return;
    clear.mutate(selected.memberId);
  };

  const handleClickClearButton = (memberId: number, nickname: string) => {
    setSelected({ memberId, nickname });
    clearModal.onOpen();
  };

  const families = family?.data?.families;

  const isNoFamilies = !families || families.length === 0;

  useEffect(() => {
    setUserType(name === 'KID' ? '보호자' : '아이');
  }, [name]);

  return isNoFamilies ? (
    <VStack w="100%" h="300px" justify="center">
      <Text layerStyle="body1" color="gray.500">
        연동된 {userType}가 없어요
      </Text>
    </VStack>
  ) : (
    <>
      <VStack w="100%" spacing="20px">
        {families?.map(({ memberId, profileUrl, nickname }) => (
          <Flex w="100%" justify="space-between" key={memberId}>
            <Flex gap="10px" align="center">
              <Circle
                size="32px"
                bgImage={profileUrl}
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
              />
              <Text layerStyle="body2">{nickname}</Text>
            </Flex>
            <XIcon
              w="24px"
              h="24px"
              onClick={() => handleClickClearButton(memberId, nickname)}
            />
          </Flex>
        ))}
      </VStack>
      <ConfirmModal
        isOpen={clearModal.isOpen}
        onClose={clearModal.onClose}
        handleClickCancelButton={clearModal.onClose}
        handleClickConfirmButton={handleClickConfirmClearButton}
        isLoading={clear.isLoading}
        confirmMessage="네, 해제할래요"
      >
        <Text layerStyle="body7" color="gray.700" textAlign="center">
          <Text as="span" layerStyle="body6">
            {selected.nickname}
          </Text>
          님과
          <br />
          연동을 해제하시겠어요?
        </Text>
      </ConfirmModal>
    </>
  );
};

export default LinkedFamily;
