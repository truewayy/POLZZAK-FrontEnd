export const userInfoDefaultValue = {
  memberType: {
    name: '',
    detail: '',
  },
  nickname: '',
  profileUrl: '',
  families: [],
};

export const signUpInfoDefaultValue = {
  socialType: '',
  username: '',
  memberType: '',
  memberTypeDetailId: 0,
  nickname: '',
};

export const onBoardingContents = {
  parent: [
    {
      title: '폴짝!',
      title2: '회원이 되신 것을 환영해요',
      description: '칭찬 도장을 모으며',
      description2: '폴짝! 성장할 아이를 기대해주세요',
      icon: '/welcome.png',
    },
    {
      title: '먼저 아이와 연동이 필요해요!',
      description: '아이와 연동을 해야',
      description2: '도장판을 만들어 줄 수 있어요',
      icon: '/search.png',
    },
    {
      title: '아이와 함께',
      title2: '도장판을 만들어보세요!',
      description: '아이가 갖고 싶은 선물을 정하고',
      description2: '함께 미션을 만들어보세요',
      icon: '/makeStampboard.png',
    },
    {
      title: '도장판을 다 모으면',
      title2: '선물 쿠폰을 발행해주세요!',
      description: '아이가 열심히 노력했어요',
      description2: '또 다른 도장판으로 동기부여를 해주세요!',
      icon: '/sendGift.png',
    },
    {
      title: '열심히 활동하면',
      title2: '포인트가 쌓여요!',
      description: '아이와 열심히 활동하면',
      description2: '계단을 폴짝! 올라갈 수 있어요',
      icon: '/pointStep.png',
    },
  ],
  kid: [
    {
      title: '폴짝!',
      title2: '회원이 되신 것을 환영해요',
      description: '칭찬 도장을 모으며',
      description2: '한 단계 폴짝! 성장해봐요',
      icon: '/welcome.png',
    },
    {
      title: '먼저 보호자와 연동이 필요해요!',
      description: '보호자와 연동을 해야',
      description2: '도장판을 받을 수 있어요',
      icon: '/search.png',
    },
    {
      title: '부모님과 함께',
      title2: '도장판을 만들어보세요!',
      description: '갖고 싶은 선물을 정하고',
      description2: '선물을 얻기 위한 미션을 만들 수 있어요',
      icon: '/makeStampboard.png',
    },
    {
      title: '도장판을 다 모으면',
      title2: '선물 쿠폰이 발행돼요!',
      description: '수고했어요',
      description2: '원하는 게 있다면 도장판을 또 생성해봐요!',
      icon: '/couponGift.png',
    },
    {
      title: '누가누가',
      title2: '제일 높이 올라갈까!',
      description: '포인트를 모아서',
      description2: '계단을 폴짝! 올라갈 수 있어요',
      icon: '/balloon.png',
    },
  ],
};

export const totalProgressingStampData = [
  {
    nickname: '쿼카',
    stamps: [
      {
        stampBoardId: 1,
        name: '가나다의 도장판',
        currentStampCount: 9,
        goalStampCount: 20,
        requestCount: 0,
        reward: '아이스크림',
        isCouponIssued: false,
      },
      {
        stampBoardId: 2,
        name: '가나다의 도장판',
        currentStampCount: 23,
        goalStampCount: 25,
        requestCount: 8,
        reward: '아이유 사인 CD',
        isCouponIssued: false,
      },
      {
        stampBoardId: 3,
        name: '가나다의 도장판',
        currentStampCount: 17,
        goalStampCount: 30,
        requestCount: 3,
        reward: '맥북 프로 16인치',
        isCouponIssued: false,
      },
    ],
  },
  {
    nickname: '멜론수박',
    stamps: [
      {
        stampBoardId: 4,
        name: '라마바의 도장판',
        currentStampCount: 20,
        goalStampCount: 20,
        requestCount: 3,
        reward: '에어팟 프로',
        isCouponIssued: true,
      },
      {
        stampBoardId: 5,
        name: '라마바의 도장판',
        currentStampCount: 2,
        goalStampCount: 10,
        requestCount: 2,
        reward: '허니콤보',
        isCouponIssued: false,
      },
      {
        stampBoardId: 6,
        name: '라마바의 도장판',
        currentStampCount: 15,
        goalStampCount: 30,
        requestCount: 1,
        reward: '맥북 M1 13인치',
        isCouponIssued: false,
      },
    ],
  },
  {
    nickname: '아이유',
    stamps: [
      {
        stampBoardId: 7,
        name: '사아자의 도장판',
        currentStampCount: 18,
        goalStampCount: 20,
        requestCount: 5,
        reward: '오마카세',
        isCouponIssued: false,
      },
      {
        stampBoardId: 8,
        name: '사아자의 도장판',
        currentStampCount: 25,
        goalStampCount: 25,
        requestCount: 2,
        reward: '애슐리 퀸즈 상품권',
        isCouponIssued: false,
      },
      {
        stampBoardId: 9,
        name: '사아자의 도장판',
        currentStampCount: 15,
        goalStampCount: 30,
        requestCount: 3,
        reward: '폴라로이드 카메라',
        isCouponIssued: false,
      },
    ],
  },
  {
    nickname: '가나다라',
    stamps: [
      {
        stampBoardId: 10,
        name: '카타파의 도장판',
        currentStampCount: 18,
        goalStampCount: 20,
        requestCount: 1,
        reward: '아이폰 14 프로 맥스',
        isCouponIssued: false,
      },
      {
        stampBoardId: 11,
        name: '카타파의 도장판',
        currentStampCount: 7,
        goalStampCount: 25,
        requestCount: 0,
        reward: '아이패드 프로 12.9인치',
        isCouponIssued: false,
      },
      {
        stampBoardId: 12,
        name: '카타파의 도장판',
        currentStampCount: 15,
        goalStampCount: 30,
        requestCount: 2,
        reward: '4k 고해상도 모니터',
        isCouponIssued: false,
      },
    ],
  },
];

export const totalCompletedStampData = [
  {
    nickname: '쿼카',
    stamps: [
      {
        stampBoardId: 1,
        name: '가나다의 도장판',
        reward: '아이스크림',
      },
      {
        stampBoardId: 2,
        name: '가나다의 도장판',
        reward: '아이유 사인 CD',
      },
      {
        stampBoardId: 3,
        name: '가나다의 도장판',
        reward: '맥북 프로 16인치',
      },
    ],
  },
  {
    nickname: '멜론수박',
    stamps: [
      {
        stampBoardId: 4,
        name: '라마바의 도장판',
        reward: '에어팟 프로',
      },
      {
        stampBoardId: 5,
        name: '라마바의 도장판',
        reward: '허니콤보',
      },
      {
        stampBoardId: 6,
        name: '라마바의 도장판',
        reward: '맥북 M1 13인치',
      },
    ],
  },
  {
    nickname: '아이유',
    stamps: [
      {
        stampBoardId: 7,
        name: '사아자의 도장판',
        reward: '오마카세',
      },
      {
        stampBoardId: 8,
        name: '사아자의 도장판',
        reward: '애슐리 퀸즈 상품권',
      },
      {
        stampBoardId: 9,
        name: '사아자의 도장판',
        reward: '폴라로이드 카메라',
      },
    ],
  },
  {
    nickname: '가나다라',
    stamps: [
      {
        stampBoardId: 10,
        name: '카타파의 도장판',
        reward: '아이폰 14 프로 맥스',
      },
      {
        stampBoardId: 11,
        name: '카타파의 도장판',
        reward: '아이패드 프로 12.9인치',
      },
      {
        stampBoardId: 12,
        name: '카타파의 도장판',
        reward: '4k 고해상도 모니터',
      },
    ],
  },
];

export const stampsExample = [
  {
    id: 1,
    content: '참 잘했어요1',
  },
  {
    id: 2,
    content: '참 잘했어요2',
  },
  {
    id: 3,
    content: '참 잘했어요3',
  },
  {
    id: 4,
    content: '참 잘했어요4',
  },
  {
    id: 5,
    content: '참 잘했어요5',
  },
  {
    id: 6,
    content: '참 잘했어요6',
  },
  {
    id: 7,
    content: '참 잘했어요7',
  },
];
