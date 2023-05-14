export interface ProcessingStampBoardPreview {
  stampBoardId: number;
  name: string;
  currentStampCount: number;
  goalStampCount: number;
  requestCount: number;
  reward: string;
  isCouponIssued: boolean;
}

export interface CompletedStampBoardPreview {
  stampBoardId: number;
  name: string;
  reward: string;
}
