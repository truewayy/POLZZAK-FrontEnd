import { Flex, Icon, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import SignUpLayout from '@/components/Layout/signUpLayout';
import NextStepButton from '@/components/SignUp/Button';
import ROUTES from '@/constants/routes';
import { CheckCircle, RightNavigation } from '@/public/icon';

const Terms = () => {
  const { push } = useRouter();

  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeService, setAgreeService] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const buttonDisabled = !agreeService || !agreePrivacy;

  const handleClickAgreeAll = () => {
    setAgreeAll(!agreeAll);
    setAgreeService(!agreeAll);
    setAgreePrivacy(!agreeAll);
  };

  const handleClickAgreeService = () => {
    setAgreeService(!agreeService);
    if (agreePrivacy) {
      setAgreeAll(false);
    }
  };

  const handleClickAgreePrivacy = () => {
    setAgreePrivacy(!agreePrivacy);
    if (agreeService) {
      setAgreeAll(false);
    }
  };

  const handleClickNextStepButton = () => {
    push(ROUTES.SIGNUP.TYPE);
  };

  useEffect(() => {
    if (agreeAll) {
      setAgreeService(true);
      setAgreePrivacy(true);
    }

    if (!agreeService || !agreePrivacy) {
      setAgreeAll(false);
    }

    if (agreeService && agreePrivacy) {
      setAgreeAll(true);
    }
  }, [agreeAll, agreeService, agreePrivacy]);

  return (
    <SignUpLayout title="먼저 약관 동의가 필요해요">
      <VStack w="100%" spacing="17px">
        <Flex
          w="100%"
          p="10px 16px"
          bg="blue.150"
          gap="10px"
          align="center"
          cursor="pointer"
          onClick={handleClickAgreeAll}
        >
          <Icon
            as={CheckCircle}
            fill={agreeAll ? '#59B9FF' : '#DADAE7'}
            w="20px"
            h="20px"
          />
          <Text layerStyle="body15Md">모두 동의</Text>
        </Flex>
        <VStack w="100%" p="0 5%" spacing="17px">
          <Flex
            w="100%"
            gap="10px"
            align="center"
            cursor="pointer"
            onClick={handleClickAgreeService}
          >
            <Icon
              as={CheckCircle}
              fill={agreeService ? '#59B9FF' : '#DADAE7'}
              w="20px"
              h="20px"
            />
            <Text layerStyle="body15Md" color="gray.500">
              서비스 이용약관에 동의합니다.
            </Text>
            <RightNavigation ml="auto" />
          </Flex>
          <Flex
            w="100%"
            gap="10px"
            align="center"
            cursor="pointer"
            onClick={handleClickAgreePrivacy}
          >
            <Icon
              as={CheckCircle}
              fill={agreePrivacy ? '#59B9FF' : '#DADAE7'}
              w="20px"
              h="20px"
            />
            <Text layerStyle="body15Md" color="gray.500">
              개인정보처리방침에 동의합니다.
            </Text>
            <RightNavigation ml="auto" />
          </Flex>
        </VStack>
        <NextStepButton
          isDisabled={buttonDisabled}
          onClick={handleClickNextStepButton}
        >
          다음
        </NextStepButton>
      </VStack>
    </SignUpLayout>
  );
};

export default Terms;
