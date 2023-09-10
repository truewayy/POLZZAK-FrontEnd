import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import { stampboardDetail, StampboardDetailData } from '@/apis/stamp';
import { missionEditAtom } from '@/store/missions';

import InputFieldView from './InputFieldView';

const stampCount = [10, 12, 16, 20, 25, 30, 36, 40, 48, 60];

const InputField = () => {
  const toast = useToast();
  const [missionModal, setMissionModal] = useState(false);
  const [missions, setMissions] = useRecoilState(missionEditAtom);
  const { unregister, control, watch, reset } = useFormContext();

  const { query } = useRouter();
  const stampboardId = query.stampboardId as string;
  const { data } = useQuery(['stampboard', stampboardId], () =>
    stampboardDetail(stampboardId)
  );

  const stampboard = data?.data as StampboardDetailData;
  const defaultMissionId = stampboard?.missions.map((item) => item.id) ?? [];

  const isMissionLimit = missions.length >= 50;
  const missionValue = (id: number) => watch(`mission${id}`);

  const handleClickAddButton = () => {
    if (!isMissionLimit) {
      setMissions((prev) => [
        ...prev,
        {
          id: prev[prev.length - 1].id + 1,
          content: '',
        },
      ]);
    }
  };
  const handleClickMissionExample = () => {
    setMissionModal(true);
  };

  const handleClickMissionModalCloseButton = () => {
    setMissionModal(false);
  };

  const handleClickDeleteButton = (id: number) => {
    if (missions.length !== 1) {
      setMissions((prev) => prev.filter((item) => item.id !== id));
      unregister(`mission${id}`);
      return;
    }
    toast({
      title: '최소 한 개의 미션은 등록해야 돼요',
      status: 'error',
      duration: 2000,
    });
  };

  useEffect(() => {
    setMissions(data?.data?.missions ?? []);
  }, [data?.data, setMissions]);

  useEffect(() => {
    reset({
      name: stampboard?.name,
      reward: stampboard?.reward,
      goalStampCount: stampboard?.goalStampCount,
    });
  }, [reset, stampboard?.name, stampboard?.reward, stampboard?.goalStampCount]);

  const InputFieldVAProps = {
    handleClickAddButton,
    handleClickDeleteButton,
    handleClickMissionExample,
    handleClickMissionModalCloseButton,
    missionValue,
    control,
    missions,
    defaultMissionId,
    missionModal,
    isMissionLimit,
    stampCount,
    stampboard,
  };

  return <InputFieldView {...InputFieldVAProps} />;
};

export default InputField;
