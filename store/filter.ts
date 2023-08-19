import { atom } from 'recoil';

export const filterModalAtom = atom<boolean>({
  key: 'filterModalAtom',
  default: false,
});

export const MainfilterAtom = atom<'전체' | string>({
  key: 'MainfilterAtom',
  default: '전체',
});

export const CouponfilterAtom = atom<'전체' | string>({
  key: 'CouponfilterAtom',
  default: '전체',
});

export const createStampFilterAtom = atom<'전체' | string>({
  key: 'createStampFilterAtom',
  default: '',
});
