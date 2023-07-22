import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import { stampboardCreateAtom } from '@/store/createStampboard';
import { missionsAtom } from '@/store/missions';

import InputFieldView from './InputFieldView';

const stampCount = [10, 12, 16, 20, 25, 30, 36, 40, 48, 60];

const InputField = () => {
  const { push } = useRouter();

  const [missions, setMissions] = useRecoilState(missionsAtom);
  const [stampboardInput, setStampboardInput] =
    useRecoilState(stampboardCreateAtom);
  const { unregister, control, watch } = useFormContext();

  const isMissionLimit = missions.length >= 50;

  const name = watch('name');
  const reward = watch('reward');
  const goalStampCount = watch('goalStampCount');

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
    push('/create/stampboard/missions');
  };

  const handleClickDeleteButton = (id: number) => {
    if (missions.length !== 1) {
      setMissions((prev) => prev.filter((item) => item.id !== id));
      unregister(`mission${id}`);
    }
  };

  useEffect(() => {
    // 입력 후 2초 뒤에 입력값을 저장한다.
    const timer = setTimeout(() => {
      setStampboardInput({
        name,
        reward,
        goalStampCount,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [goalStampCount, name, reward, setStampboardInput]);

  const InputFieldVAProps = {
    handleClickAddButton,
    handleClickDeleteButton,
    handleClickMissionExample,
    missionValue,
    stampboardInput,
    control,
    missions,
    isMissionLimit,
    stampCount,
  };

  return <InputFieldView {...InputFieldVAProps} />;
};

export default InputField;
