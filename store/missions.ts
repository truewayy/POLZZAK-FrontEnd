/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

const missionDefault = [
  {
    id: 1,
    content: '',
  },
  {
    id: 2,
    content: '',
  },
  {
    id: 3,
    content: '',
  },
];

export const missionsAtom = atom<{ id: number; content: string }[]>({
  key: 'missionsAtom',
  default: missionDefault,
});

export const missionEditAtom = atom<{ id: number; content: string }[]>({
  key: 'missionEditAtom',
  default: missionDefault,
});
