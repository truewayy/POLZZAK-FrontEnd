import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

import { createStampboard } from '@/apis/stamp';
import { MainfilterAtom } from '@/store/filter';
import { userInfoAtom } from '@/store/userInfo';

import HeaderView from './HeaderView';

interface StampboardCreateInfo {
  kidId: number;
  name: string;
  goalStampCount: number;
  reward: string;
  missionContents: string[];
}

const Header = () => {
  const confirm = useDisclosure();
  const filter = useRecoilValue(MainfilterAtom);
  const userInfo = useRecoilValue(userInfoAtom);
  const families = userInfo?.families;
  const familyId = families.find(
    (family) => family.nickname === filter
  )?.memberId;

  const { handleSubmit, watch } = useFormContext();
  const { push, back } = useRouter();

  const create = useMutation(
    (data: StampboardCreateInfo) => createStampboard(data),
    {
      onSuccess: () => {
        confirm.onClose();
        push('/home');
      },
    }
  );

  const handleClickBack = () => {
    back();
  };

  const handleClickConfirmApproveButton = () => {
    const data = {
      ...watch(),
    };
    const missionContents = Object.keys(data)
      .filter((key) => key.includes('mission'))
      .map((key) => data[key]);

    const sendingData = {
      kidId: familyId as number,
      goalStampCount: data.goalStampCount as number,
      name: data.name as string,
      reward: data.reward as string,
      missionContents: missionContents.filter(
        (item) => item.length !== 0
      ) as string[],
    };
    create.mutate(sendingData);
  };

  const handleClickRegister = () => {
    confirm.onOpen();
  };

  const HeaderVAProps = {
    handleClickBack,
    handleSubmit,
    handleClickRegister,
    handleClickConfirmApproveButton,
    confirm,
    isLoading: create.isLoading,
  };

  return <HeaderView {...HeaderVAProps} />;
};

export default Header;
