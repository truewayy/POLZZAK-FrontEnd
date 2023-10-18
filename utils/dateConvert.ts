/* eslint-disable import/prefer-default-export */
export const formatDateDifference = (createdDate: string) => {
  const now = new Date();
  const created = new Date(createdDate);
  const koreaConverted = new Date(created.getTime() + 9 * 60 * 60 * 1000);
  const timeDiff = now.getTime() - koreaConverted.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return '방금 전';
  }
  if (minutes < 60) {
    return `${minutes}분 전`;
  }
  if (hours < 24) {
    return `${hours}시간 전`;
  }
  if (days <= 3) {
    return `${days}일 전`;
  }
  const month = koreaConverted.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
  const date = koreaConverted.getDate();
  return `${month < 10 ? `0${month}` : month}.${date < 10 ? `0${date}` : date}`;
};
