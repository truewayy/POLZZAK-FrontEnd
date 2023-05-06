import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

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
  nickname: string;
}

export const userInfoAtom = atom<UserInfo>({
  key: 'userInfoAtom',
  default: {
    type: '',
    nickname: '',
    profileImage: '',
    chains: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const signUpInfoAtom = atom<SignUpInfo>({
  key: 'signUpInfoAtom',
  default: {
    socialType: '',
    username: '',
    memberType: '',
    nickname: '',
  },
  effects_UNSTABLE: [sessionAtom],
});
