import { Grid, Text, VStack } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

import { RedCharacter, YellowCharacter } from '@/public/icon';

import NextStepButton from '../Button';

interface MemberTypeVAProps {
  memberType: string;
  buttonDisabled: boolean;
  handleChangeMemberType: MouseEventHandler<HTMLDivElement>;
  handleClickButton: () => void;
}

const MemberTypeView = ({
  memberType,
  buttonDisabled,
  handleChangeMemberType,
  handleClickButton,
}: MemberTypeVAProps) => (
  <VStack w="100%">
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
    <NextStepButton onClick={handleClickButton} disabled={buttonDisabled}>
      다음
    </NextStepButton>
  </VStack>
);

export default MemberTypeView;
