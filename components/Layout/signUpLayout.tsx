/* eslint-disable react/require-default-props */
import { Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { signUpInfoAtom } from '@/store/userInfo';

import Header from '../SignUp/Header/Header';

interface SignupLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  description2?: string;
}

const SignUpLayout = ({
  children,
  title,
  description,
  description2,
}: SignupLayoutProps) => {
  const { push } = useRouter();
  const signUpInfo = useRecoilValue(signUpInfoAtom);

  useEffect(() => {
    if (!signUpInfo.socialType || !signUpInfo.username) {
      push('/');
    }
  }, [signUpInfo, push]);

  return (
    <VStack pos="relative" minH="100vh" p="0 5%" bg="gray.100">
      <Header />
      <VStack w="100%" spacing="16px" pb={65}>
        <Text layerStyle="head22B" color="#413E39" alignSelf="flex-start">
          {title}
        </Text>
        {description && (
          <Text layerStyle="caption13L" color="gray.500" alignSelf="flex-start">
            {description}
            {description2 && (
              <>
                <br />
                {description2}
              </>
            )}
          </Text>
        )}
      </VStack>
      {children}
    </VStack>
  );
};

export default SignUpLayout;
