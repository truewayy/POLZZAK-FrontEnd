import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import {
  signUpInfoDefaultValue,
  userInfoDefaultValue,
} from '@/constants/defaultValue';

const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

const localStorage =
  typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom: localAtom } = recoilPersist({
  key: 'polzzak-local',
  storage: localStorage,
});

const { persistAtom: sessionAtom } = recoilPersist({
  key: 'polzzak-session',
  storage: sessionStorage,
});

interface UserInfo {
  memberType: string;
  nickname: string;
  profileUrl: string;
  families: {
    memberId: number;
    nickname: string;
    memberType: string;
    profileUrl: string;
  }[];
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
  effects_UNSTABLE: [localAtom],
});

export const signUpInfoAtom = atom<SignUpInfo>({
  key: 'signUpInfoAtom',
  default: signUpInfoDefaultValue,
  effects_UNSTABLE: [sessionAtom],
});
