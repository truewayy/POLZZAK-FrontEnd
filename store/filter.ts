import { atom } from 'recoil';

export const filterModalAtom = atom<boolean>({
  key: 'filterModalAtom',
  default: false,
});

export const filterAtom = atom<'전체' | string>({
  key: 'filterAtom',
  default: '전체',
});
