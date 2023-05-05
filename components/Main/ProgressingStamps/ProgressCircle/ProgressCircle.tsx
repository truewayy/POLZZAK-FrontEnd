import { useEffect, useState } from 'react';

import ProgressCircleView from './ProgressCircleView';

interface ProgressCircleProps {
  percentage: number;
}

const calculateDegreesFromPercentage = (percentage: number) =>
  (280 / 100) * percentage;

const calculateDash = (degrees: number) =>
  ((degrees * Math.PI) / 180) * 0.5 * 40;

const ProgressCircle = ({ percentage }: ProgressCircleProps) => {
  const [progress, setProgress] = useState(0);

  const percentageDegrees = calculateDegreesFromPercentage(progress);

  const barDash = calculateDash(280);
  const barGap = calculateDash(360 - 280) * 2;

  const progressDash = calculateDash(percentageDegrees);
  const progressGap = calculateDash(360 - percentageDegrees) * 2;

  const rotation = 0 - (280 - percentageDegrees) / 2;

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress <= percentage) {
        setProgress((prev) => prev + 1);
      }
    }, 10);
    return () => {
      clearInterval(timer);
    };
  }, [percentage, progress]);

  const ProgressCircleVAProps = {
    percentage,
    barDash,
    barGap,
    progressDash,
    progressGap,
    rotation,
  };

  return <ProgressCircleView {...ProgressCircleVAProps} />;
};

export default ProgressCircle;
