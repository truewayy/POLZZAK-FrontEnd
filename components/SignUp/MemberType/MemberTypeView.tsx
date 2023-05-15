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
        id="KID"
        p="24px 20px"
        spacing={42}
        border="1px solid"
        borderColor={memberType === 'KID' ? 'polzzak.default' : 'white'}
        borderRadius={10}
        bg={memberType === 'KID' ? 'blue.100' : 'white'}
        cursor="pointer"
        onClick={handleChangeMemberType}
      >
        <Text
          layerStyle="subtitle2"
          color={memberType === 'KID' ? 'polzzak.default' : 'black'}
          fontWeight={memberType === 'KID' ? 'bold' : 'normal'}
          alignSelf="flex-start"
        >
          아이 회원
        </Text>
        <YellowCharacter alignSelf="flex-end" w="63%" h="71%" />
      </VStack>
      <VStack
        id="PARENT"
        p="24px 20px"
        spacing={42}
        border="1px solid"
        borderColor={memberType === 'PARENT' ? 'polzzak.default' : 'white'}
        borderRadius={10}
        bg={memberType === 'PARENT' ? 'blue.100' : 'white'}
        cursor="pointer"
        onClick={handleChangeMemberType}
      >
        <Text
          layerStyle="subtitle2"
          color={memberType === 'PARENT' ? 'polzzak.default' : 'black'}
          fontWeight={memberType === 'PARENT' ? 'bold' : 'normal'}
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
