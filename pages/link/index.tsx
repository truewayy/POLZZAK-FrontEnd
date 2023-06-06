import { Box, Button, Circle, Flex, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

import { familiesInfo, receivedRequest } from '@/apis/family';
import SearchInput from '@/components/Link/SearchInput/SearchInput';
import ROUTES from '@/constants/routes';
import { BackIcon, ClipIcon, MailIcon, XIcon } from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';

const Link = () => {
  const [userType, setUserType] = useState('');
  const { push } = useRouter();
  const {
    memberType: { name },
  } = useRecoilValue(userInfoAtom);
  const { data: received } = useQuery(['request', 'received'], receivedRequest);
  const { data: sent } = useQuery(['request', 'sent'], receivedRequest);
  const { data: family } = useQuery(['familes', 'list'], familiesInfo);
  const handleClickBackButton = () => {
    push(ROUTES.MAIN);
  };

  const receivedRequests = received?.data?.families;
  const sentRequests = sent?.data?.families;
  const families = family?.data?.families;
  const isNoReceivedRequests = receivedRequests?.length === 0;
  const isNoSentRequests = sentRequests?.length === 0;
  const isAllNoRequests = isNoReceivedRequests && isNoSentRequests;
  const isNoFamilies = families?.length === 0;

  useEffect(() => {
    setUserType(name === 'KID' ? '보호자' : '아이');
  }, [name]);

  return (
    <VStack w="100%" minH="100vh" bg="white">
      <VStack w="100%" align="flex-start" bg="white" p="0 5% 26px 5%">
        <Flex w="100%" p="10px 0" pos="fixed" bg="white">
          <BackIcon w="24px" h="24px" onClick={handleClickBackButton} />
        </Flex>
        <Flex w="100%" p="45px 0 10px 0">
          <Text layerStyle="title1">연동 관리</Text>
        </Flex>
        <Flex w="100%" p="14px 0 24px 0">
          <SearchInput />
        </Flex>
        <Flex w="100%" p="14px 0 16px 0" gap="6px" align="center">
          <MailIcon w="14px" h="14px" />
          <Text layerStyle="subtitle2" color="gray.500">
            요청 목록
          </Text>
        </Flex>
        {isAllNoRequests ? (
          <Text layerStyle="body1" color="gray.500">
            연동 요청이 없어요
          </Text>
        ) : (
          <VStack w="100%" spacing="30px">
            <VStack w="100%" spacing="10px" align="center">
              <Text layerStyle="body2" color="gray.500" alignSelf="flex-start">
                나에게 온 연동 요청
              </Text>
              {receivedRequests?.map(({ memberId, profileUrl, nickname }) => (
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
                  <Flex gap="10px">
                    <Button
                      variant="unstyled"
                      fontSize="14px"
                      fontWeight="600"
                      color="white"
                      bg="blue.500"
                      h="28px"
                      p="0 16px"
                    >
                      수락
                    </Button>
                    <Button
                      variant="unstyled"
                      fontSize="14px"
                      fontWeight="600"
                      color="white"
                      bg="error.500"
                      h="28px"
                      p="0 16px"
                    >
                      거절
                    </Button>
                  </Flex>
                </Flex>
              ))}
            </VStack>
            <VStack w="100%" spacing="10px" align="center">
              <Text layerStyle="body2" color="gray.500" alignSelf="flex-start">
                내가 보낸 연동 요청
              </Text>
              {sentRequests?.map(({ memberId, profileUrl, nickname }) => (
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
                  <Button
                    variant="unstyled"
                    fontSize="14px"
                    fontWeight="600"
                    color="white"
                    bg="error.500"
                    h="28px"
                    p="0 16px"
                  >
                    요청 취소
                  </Button>
                </Flex>
              ))}
            </VStack>
          </VStack>
        )}
      </VStack>
      <Box w="100%" h="8px" bg="gray.100" />
      <VStack
        w="100%"
        p="26px 5% 30px 5%"
        bg="white"
        align="flex-start"
        spacing="16px"
      >
        <Flex w="100%" gap="6px" align="center">
          <ClipIcon w="14px" h="14px" />
          <Text layerStyle="subtitle2" color="gray.500">
            나와 연동된 {userType} {families?.length}
          </Text>
        </Flex>
        {isNoFamilies ? (
          <Text layerStyle="body1" color="gray.500">
            연동된 {userType}가 없어요
          </Text>
        ) : (
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
                <XIcon w="24px" h="24px" />
              </Flex>
            ))}
          </VStack>
        )}
      </VStack>
    </VStack>
  );
};

export default Link;
