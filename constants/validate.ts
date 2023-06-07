export const nameValidate = {
  required: '도장판 이름을 입력해주세요',
  minLength: {
    value: 2,
    message: '최소 2글자는 작성해야 돼요',
  },
  maxLength: {
    value: 20,
    message: '20자까지만 쓸 수 있어요',
  },
};

export const rewardValidate = {
  required: '보상을 입력해주세요',
  minLength: {
    value: 2,
    message: '최소 2글자는 작성해야 돼요',
  },
  maxLength: {
    value: 30,
    message: '30자까지만 쓸 수 있어요',
  },
};

export const stampCountValidate = {
  required: '도장 개수를 선택해주세요',
};

export const missionValidate = {
  required: '빈칸이 있어요!',
  minLength: {
    value: 2,
    message: '최소 2글자는 작성해야 돼요',
  },
  maxLength: {
    value: 20,
    message: '20자까지만 쓸 수 있어요',
  },
};
