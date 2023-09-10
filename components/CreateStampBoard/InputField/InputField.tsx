import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import { missionsAtom } from '@/store/missions';

import InputFieldView from './InputFieldView';

const stampCount = [10, 12, 16, 20, 25, 30, 36, 40, 48, 60];

const InputField = () => {
  const [missionModal, setMissionModal] = useState(false);
  const [missions, setMissions] = useRecoilState(missionsAtom);
  const { unregister, control, watch } = useFormContext();

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
    }
  };

  const InputFieldVAProps = {
    handleClickAddButton,
    handleClickDeleteButton,
    handleClickMissionExample,
    handleClickMissionModalCloseButton,
    missionValue,
    control,
    missions,
    missionModal,
    isMissionLimit,
    stampCount,
  };

  return <InputFieldView {...InputFieldVAProps} />;
};

export default InputField;
