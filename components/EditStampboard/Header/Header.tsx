import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

import {
  editStampboard,
  stampboardDetail,
  StampboardDetailData,
} from '@/apis/stamp';

import HeaderView from './HeaderView';

interface StampboardEditInfo {
  name: string;
  goalStampCount: number;
  reward: string;
  missions: (
    | {
        id: number;
        content: string;
      }
    | {
        id: null;
        content: string;
      }
  )[];
}

const Header = () => {
  const confirm = useDisclosure();

  const { handleSubmit, watch } = useFormContext();
  const { push, back } = useRouter();

  const { query } = useRouter();
  const stampboardId = query.stampboardId as string;
  const { data, refetch } = useQuery(['stampboard', stampboardId], () =>
    stampboardDetail(stampboardId)
  );

  const stampboard = data?.data as StampboardDetailData;
  const defaultMissionId = stampboard?.missions.map((item) => item.id) ?? [];

  const edit = useMutation(
    (formData: StampboardEditInfo) => editStampboard(formData, stampboardId),
    {
      onSuccess: () => {
        confirm.onClose();
        refetch();
        push('/main');
      },
    }
  );

  const handleClickBack = () => {
    back();
  };

  const handleClickConfirmApproveButton = () => {
    const watchData = {
      ...watch(),
    };
    const missionContents = Object.keys(watchData)
      .filter((key) => key.includes('mission'))
      .map((key) => ({
        id: Number(key.replace('mission', '')),
        content: watchData[key] as string,
      }));

    const convertedMissionContents = missionContents.map((item) => {
      if (defaultMissionId.includes(item.id)) return item;
      return {
        id: null,
        content: item.content,
      };
    });

    const sendingData = {
      goalStampCount: watchData.goalStampCount as number,
      name: watchData.name as string,
      reward: watchData.reward as string,
      missions: convertedMissionContents,
    };
    edit.mutate(sendingData);
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
    isLoading: edit.isLoading,
  };

  return <HeaderView {...HeaderVAProps} />;
};

export default Header;
