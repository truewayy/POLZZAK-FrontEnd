import styled from '@emotion/styled';

interface ProgressCircleProps {
  percentage: number;
}

const calculateDegreesFromPercentage = (percentage: number) =>
  (240 / 100) * percentage;

const calculateDash = (degrees: number) =>
  ((degrees * Math.PI) / 180) * 0.5 * 40;

const ProgressCircle = ({ percentage }: ProgressCircleProps) => {
  const percentageDegrees = calculateDegreesFromPercentage(percentage);

  const barDash = calculateDash(240);
  const barGap = calculateDash(360 - 240) * 2;

  const progressDash = calculateDash(percentageDegrees);
  const progressGap = calculateDash(360 - percentageDegrees) * 2;

  const rotation = 0 - (240 - percentageDegrees) / 2;

  return (
    <Svg viewBox="0 0 100 100">
      <Path
        d="
	    M 10, 50
	    a 40,40 0 1,0 80,0
	    a 40,40 0 1,0 -80,0
	   "
        style={{
          stroke: '#F0F7FF',
          strokeDasharray: `${barDash} ${barGap}`,
        }}
      />
      <Path
        d="
		  M 10, 50
	    a 40,40 0 1,0 80,0
	    a 40,40 0 1,0 -80,0
		"
        style={{
          stroke: '#59B9FF',
          strokeDasharray: `${progressDash} ${progressGap}`,
          transformOrigin: 'center center',
          transform: `rotate(${rotation}deg)`,
          transition: 'stroke-dasharray 0.5s ease 0s, transform 0.5s ease 0s',
        }}
      />
    </Svg>
  );
};

export default ProgressCircle;

const Svg = styled.svg`
  width: 300px !important;
  margin: 0 auto;
  padding: 0;
  display: block;
  transform-origin: center center;
  transform: rotate(90deg);
`;

const Path = styled.path`
  stroke-linecap: round;
  stroke-width: 6px;
  fill: none;
`;
