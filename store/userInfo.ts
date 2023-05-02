import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const userInfoAtom = atom({
  key: 'userInfoAtom',
  default: {
    type: '',
    nickname: '',
    profileImage: '',
    chain: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export default userInfoAtom;
