import { Box, keyframes } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const timerAnimation = keyframes`
    0% {
        stroke-dashoffset: 0;
    }
    100% {
        stroke-dashoffset: 88px;
    }
`;

interface TimerProps {
  count: number;
  onTimerEnd: () => void;
}

const Timer = ({ count, onTimerEnd }: TimerProps) => {
  const [time, setTime] = useState<number>(count);

  useEffect(() => {
    // 0초가 되면 타이머 종료
    if (time === 0) return onTimerEnd();
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, onTimerEnd]);

  return (
    <Box w="32px" h="32px" pos="relative" textAlign="center">
      <Box
        textStyle="subtitle3"
        color="#59B9FF"
        lineHeight="32px"
        display="inline-block"
      >
        {time}
      </Box>
      <svg
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '32px',
          height: '32px',
          transform: 'rotateY(-180deg) rotateZ(-90deg)',
        }}
      >
        <Circle count={count} />
      </svg>
    </Box>
  );
};

export default Timer;

const Circle = styled.circle<{ count: number }>`
  r: 14;
  cx: 16;
  cy: 16;
  stroke-dasharray: 88px;
  stroke-dashoffset: 88px;
  stroke-linecap: round;
  stroke-width: 3px;
  stroke: #c7e5ff;
  fill: none;
  animation: ${timerAnimation} 1s linear infinite;
`;
