import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface UserInfo {
  type: string;
  nickname: string;
  profileImage: string;
  chains: string[];
}

const userInfoAtom = atom<UserInfo>({
  key: 'userInfoAtom',
  default: {
    type: '',
    nickname: '',
    profileImage: '',
    chains: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export default userInfoAtom;
