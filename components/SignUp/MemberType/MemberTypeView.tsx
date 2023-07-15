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
        id="PARENT"
        p="20px 14px"
        spacing="12px"
        border="1px solid"
        borderColor={memberType === 'PARENT' ? 'polzzak.default' : 'gray.300'}
        borderRadius={10}
        bg={memberType === 'PARENT' ? 'blue.100' : 'white'}
        cursor="pointer"
        onClick={handleChangeMemberType}
      >
        <Text
          layerStyle="subtitle16Sbd"
          color={memberType === 'PARENT' ? 'polzzak.default' : 'black'}
          fontWeight={memberType === 'PARENT' ? '700' : '600'}
        >
          보호자 회원
        </Text>
        <Text
          layerStyle="caption12Md"
          color={memberType === 'PARENT' ? 'polzzak.default' : 'gray.500'}
          fontWeight={memberType === 'PARENT' ? '600' : '500'}
          textAlign="center"
        >
          “도장판을 만들어서
          <br />
          칭찬 도장을 찍어주고 싶어요”
        </Text>
        <RedCharacter alignSelf="center" w="120px" h="100px" />
      </VStack>

      <VStack
        id="KID"
        p="20px 14px"
        spacing="12px"
        border="1px solid"
        borderColor={memberType === 'KID' ? 'polzzak.default' : 'gray.300'}
        borderRadius={10}
        bg={memberType === 'KID' ? 'blue.100' : 'white'}
        cursor="pointer"
        onClick={handleChangeMemberType}
      >
        <Text
          layerStyle="subtitle16Sbd"
          color={memberType === 'KID' ? 'polzzak.default' : 'black'}
          fontWeight={memberType === 'KID' ? '700' : '600'}
        >
          아이 회원
        </Text>
        <Text
          layerStyle="caption12Md"
          color={memberType === 'KID' ? 'polzzak.default' : 'gray.500'}
          fontWeight={memberType === 'KID' ? '600' : '500'}
          textAlign="center"
        >
          “칭찬 도장을 모아서
          <br />
          선물을 받고 싶어요”
        </Text>
        <YellowCharacter alignSelf="center" w="90px" h="100px" />
      </VStack>
    </Grid>
    <NextStepButton onClick={handleClickButton} disabled={buttonDisabled}>
      다음
    </NextStepButton>
  </VStack>
);

export default MemberTypeView;
