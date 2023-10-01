import { Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { userInfo } from '@/apis/user';
import { NoLinkedFamilyIcon } from '@/public/icon';

const ProgressingCouponsNoFamiles = () => {
  const { data: user } = useQuery(['userInfo'], userInfo);
  const name = user?.data?.memberType.name;

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

export default ProgressingCouponsNoFamiles;
