/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

interface StampboardCreate {
  name: string;
  reward: string;
  goalStampCount: number;
}

export const stampboardCreateAtom = atom<StampboardCreate>({
  key: 'stampboardCreateAtom',
  default: {
    name: '',
    reward: '',
    goalStampCount: 0,
  },
});
