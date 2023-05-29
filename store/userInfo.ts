import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import {
  signUpInfoDefaultValue,
  userInfoDefaultValue,
} from '@/constants/defaultValue';

const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'polzzak-local',
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
  effects_UNSTABLE: [persistAtom],
});

export const signUpInfoAtom = atom<SignUpInfo>({
  key: 'signUpInfoAtom',
  default: signUpInfoDefaultValue,
  effects_UNSTABLE: [sessionAtom],
});
