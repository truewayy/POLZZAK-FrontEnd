import { Button, Flex, Grid, Text, VStack } from '@chakra-ui/react';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { LeftArrow, RedCharacter, YellowCharacter } from '@/public/icon';
import { signUpInfoAtom } from '@/store/userInfo';

const SignUp = () => {
  const [signUpInfo, setSignupInfo] = useRecoilState(signUpInfoAtom);
  const [memberType, setMemberType] = useState('');

  const handleChangeMemberType: MouseEventHandler<HTMLDivElement> = (e) => {
    setSignupInfo((prev) => ({ ...prev, memberType: e.currentTarget.id }));
  };

  useEffect(() => {
    setMemberType(signUpInfo.memberType);
  }, [signUpInfo.memberType]);

  return (
    <VStack pos="relative" minH="100vh" p="0 5%" bg="gray.100">
      <Flex
        w="100%"
        h="50px"
        mb="36px"
        justifyContent="space-between"
        alignItems="center"
      >
        <LeftArrow w={11} h={19} />
      </Flex>
      <VStack w="100%" spacing={65}>
        <Text layerStyle="head22B" color="#413E39" alignSelf="flex-start">
          회원 종류를 선택해주세요
        </Text>
        <Grid w="100%" gap={13} templateColumns="repeat(2, 1fr)">
          <VStack
            id="child"
            p="24px 20px"
            spacing={42}
            border="1px solid"
            borderColor={memberType === 'child' ? 'polzzak.default' : 'white'}
            borderRadius={10}
            bg={memberType === 'child' ? 'blue.100' : 'white'}
            cursor="pointer"
            onClick={handleChangeMemberType}
          >
            <Text
              layerStyle="head16B"
              color={memberType === 'child' ? 'polzzak.default' : 'black'}
              fontWeight={memberType === 'child' ? 'bold' : 'normal'}
              alignSelf="flex-start"
            >
              아이 회원
            </Text>
            <YellowCharacter alignSelf="flex-end" w="63%" h="71%" />
          </VStack>
          <VStack
            id="parent"
            p="24px 20px"
            spacing={42}
            border="1px solid"
            borderColor={memberType === 'parent' ? 'polzzak.default' : 'white'}
            borderRadius={10}
            bg={memberType === 'parent' ? 'blue.100' : 'white'}
            cursor="pointer"
            onClick={handleChangeMemberType}
          >
            <Text
              layerStyle="head16B"
              color={memberType === 'parent' ? 'polzzak.default' : 'black'}
              fontWeight={memberType === 'parent' ? 'bold' : 'normal'}
              alignSelf="flex-start"
            >
              보호자 회원
            </Text>
            <RedCharacter alignSelf="flex-end" w="75%" h="71%" />
          </VStack>
        </Grid>
      </VStack>
      <Button
        bg="polzzak.default"
        w="90%"
        p="22px"
        borderRadius={10}
        layerStyle="highlight16SB"
        color="white"
        pos="absolute"
        bottom="0"
      >
        다음
      </Button>
    </VStack>
  );
};

export default SignUp;
