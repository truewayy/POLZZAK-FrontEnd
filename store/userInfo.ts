import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import {
  signUpInfoDefaultValue,
  userInfoDefaultValue,
} from '@/constants/defaultValue';

const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist();
const { persistAtom: sessionAtom } = recoilPersist({
  key: 'sessionStorage',
  storage: sessionStorage,
});

interface UserInfo {
  type: string;
  nickname: string;
  profileImage: string;
  chains: string[];
}

interface SignUpInfo {
  socialType: string;
  username: string;
  memberType: string;
  parentType: string;
  nickname: string;
}

export const userInfoAtom = atom<UserInfo>({
  key: 'userInfoAtom',
  default: userInfoDefaultValue,
  effects_UNSTABLE: [persistAtom],
});

export const signUpInfoAtom = atom<SignUpInfo>({
  key: 'signUpInfoAtom',
  default: signUpInfoDefaultValue,
  effects_UNSTABLE: [sessionAtom],
});
