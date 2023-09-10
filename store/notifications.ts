/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

export const notiDeleteOnAtom = atom<boolean>({
  key: 'notiDeleteOnAtom',
  default: false,
});

export const notificationsAtom = atom<number[]>({
  key: 'notificationsAtom',
  default: [],
});
