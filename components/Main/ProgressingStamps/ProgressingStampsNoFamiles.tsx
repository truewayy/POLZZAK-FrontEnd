import { Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { NoLinkedFamilyIcon } from '@/public/icon';
import { userInfoAtom } from '@/store/userInfo';

const ProgressingStampsNoFamiles = () => {
  const {
    memberType: { name },
  } = useRecoilValue(userInfoAtom);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const isKid = name === 'KID';
    const type = isKid ? '보호자' : '아이';
    const made = isKid ? '받을' : '만들';
    setTitle(type);
    setDescription(made);
  }, [name]);

  return (
    <VStack
      m="0 5%"
      bg="white"
      h="500px"
      border="1px dashed #DADAE7"
      borderRadius="8px"
      justifyContent="center"
      spacing="24px"
    >
      <NoLinkedFamilyIcon w="157px" h="96px" />
      <Text layerStyle="body14Md" textAlign="center">
        {title}와 연동되면 <br />
        도장판을 {description} 수 있어요!
      </Text>
    </VStack>
  );
};

export default ProgressingStampsNoFamiles;
