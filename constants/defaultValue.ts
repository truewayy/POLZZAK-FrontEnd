export const userInfoDefaultValue = {
  type: '',
  nickname: '',
  profileImage: '',
  chains: [],
};

export const signUpInfoDefaultValue = {
  socialType: '',
  username: '',
  memberType: '',
  parentType: '',
  nickname: '',
};

export const onBoardingContents = {
  parent: [
    {
      title: '폴짝!',
      title2: '회원이 되신 것을 환영해요',
      description: '칭찬 도장을 모으며',
      description2: '폴짝! 성장할 아이를 기대해주세요',
    },
    {
      title: '먼저 아이와 연동이 필요해요!',
      description: '아이와 연동을 해야',
      description2: '도장판을 만들어 줄 수 있어요',
    },
    {
      title: '아이와 함께',
      title2: '도장판을 만들어보세요!',
      description: '아이가 갖고 싶은 선물을 정하고',
      description2: '함께 미션을 만들어보세요',
    },
    {
      title: '도장판을 다 모으면',
      title2: '선물 쿠폰을 발행해주세요!',
      description: '아이가 열심히 노력했어요',
      description2: '또 다른 도장판으로 동기부여를 해주세요!',
    },
    {
      title: '열심히 활동하면',
      title2: '포인트가 쌓여요!',
      description: '아이와 열심히 활동하면 계단이 상승해요',
      description2: '나의 랭킹도 확인할 수 있어요',
    },
  ],
  kid: [
    {
      title: '폴짝!',
      title2: '회원이 되신 것을 환영해요',
      description: '칭찬 도장을 모으며',
      description2: '한 단계 폴짝! 성장해봐요',
    },
    {
      title: '먼저 보호자와 연동이 필요해요!',
      description: '보호자와 연동을 해야',
      description2: '도장판을 받을 수 있어요',
    },
    {
      title: '부모님과 함께',
      title2: '도장판을 만들어보세요!',
      description: '갖고 싶은 선물을 정하고',
      description2: '선물을 얻기 위한 미션을 만들 수 있어요',
    },
    {
      title: '도장판을 다 모으면',
      title2: '선물 쿠폰이 발행돼요!',
      description: '수고했어요',
      description2: '원하는 게 있다면 도장판을 또 생성해봐요!',
    },
    {
      title: '누가누가',
      title2: '제일 높이 올라갈까!',
      description: '포인트를 모아서',
      description2: '계단을 폴짝! 올라갈 수 있어요',
    },
  ],
};

export const totalStampData = [
  {
    nickname: '쿼카',
    stamps: {
      progressing: [
        {
          id: 1,
          title: '가나다의 도장판',
          currentStamp: 9,
          totalStamp: 20,
          requestCount: 0,
          reward: '아이스크림',
        },
        {
          id: 2,
          title: '가나다의 도장판',
          currentStamp: 23,
          totalStamp: 25,
          requestCount: 8,
          reward: '아이유 사인 CD',
        },
        {
          id: 3,
          title: '가나다의 도장판',
          currentStamp: 17,
          totalStamp: 30,
          requestCount: 3,
          reward: '맥북 프로 16인치',
        },
      ],
      completed: [
        {
          id: 1,
          title: '가나다의 도장판',
          reward: '아이스크림',
        },
        {
          id: 2,
          title: '가나다의 도장판',
          reward: '아이유 사인 CD',
        },
        {
          id: 3,
          title: '가나다의 도장판',
          reward: '맥북 프로 16인치',
        },
      ],
    },
  },
  {
    nickname: '멜론수박',
    stamps: {
      progressing: [
        {
          id: 4,
          title: '라마바의 도장판',
          currentStamp: 20,
          totalStamp: 20,
          requestCount: 3,
          reward: '에어팟 프로',
        },
        {
          id: 5,
          title: '라마바의 도장판',
          currentStamp: 2,
          totalStamp: 10,
          requestCount: 2,
          reward: '허니콤보',
        },
        {
          id: 6,
          title: '라마바의 도장판',
          currentStamp: 15,
          totalStamp: 30,
          requestCount: 1,
          reward: '맥북 M1 13인치',
        },
      ],
      completed: [
        {
          id: 4,
          title: '라마바의 도장판',
          reward: '에어팟 프로',
        },
        {
          id: 5,
          title: '라마바의 도장판',
          reward: '허니콤보',
        },
        {
          id: 6,
          title: '라마바의 도장판',
          reward: '맥북 M1 13인치',
        },
      ],
    },
  },
  {
    nickname: '아이유',
    stamps: {
      progressing: [
        {
          id: 7,
          title: '사아자의 도장판',
          currentStamp: 18,
          totalStamp: 20,
          requestCount: 5,
          reward: '오마카세',
        },
        {
          id: 8,
          title: '사아자의 도장판',
          currentStamp: 25,
          totalStamp: 25,
          requestCount: 2,
          reward: '애슐리 퀸즈 상품권',
        },
        {
          id: 9,
          title: '사아자의 도장판',
          currentStamp: 15,
          totalStamp: 30,
          requestCount: 3,
          reward: '폴라로이드 카메라',
        },
      ],
      completed: [
        {
          id: 7,
          title: '사아자의 도장판',
          reward: '오마카세',
        },
        {
          id: 8,
          title: '사아자의 도장판',
          reward: '애슐리 퀸즈 상품권',
        },
        {
          id: 9,
          title: '사아자의 도장판',
          reward: '폴라로이드 카메라',
        },
      ],
    },
  },
  {
    nickname: '가나다라',
    stamps: {
      progressing: [
        {
          id: 10,
          title: '카타파의 도장판',
          currentStamp: 18,
          totalStamp: 20,
          requestCount: 1,
          reward: '아이폰 14 프로 맥스',
        },
        {
          id: 11,
          title: '카타파의 도장판',
          currentStamp: 7,
          totalStamp: 25,
          requestCount: 0,
          reward: '아이패드 프로 12.9인치',
        },
        {
          id: 12,
          title: '카타파의 도장판',
          currentStamp: 15,
          totalStamp: 30,
          requestCount: 2,
          reward: '4k 고해상도 모니터',
        },
      ],
      completed: [
        {
          id: 10,
          title: '카타파의 도장판',
          reward: '아이폰 14 프로 맥스',
        },
        {
          id: 11,
          title: '카타파의 도장판',
          reward: '아이패드 프로 12.9인치',
        },
        {
          id: 12,
          title: '카타파의 도장판',
          reward: '4k 고해상도 모니터',
        },
      ],
    },
  },
];
