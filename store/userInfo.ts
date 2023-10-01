/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { signUpInfoDefaultValue } from '@/constants/defaultValue';

const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom: sessionAtom } = recoilPersist({
  key: 'polzzak-session',
  storage: sessionStorage,
});

interface SignUpInfo {
  socialType: string;
  username: string;
  memberType: string;
  memberTypeDetailId: number;
  nickname: string;
}

export const signUpInfoAtom = atom<SignUpInfo>({
  key: 'signUpInfoAtom',
  default: signUpInfoDefaultValue,
  effects_UNSTABLE: [sessionAtom],
});
