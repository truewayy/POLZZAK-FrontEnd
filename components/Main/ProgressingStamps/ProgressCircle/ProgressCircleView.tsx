import styled from '@emotion/styled';

interface ProgressCircleVAProps {
  percentage: number;
  barDash: number;
  barGap: number;
  progressDash: number;
  progressGap: number;
  rotation: number;
}

const ProgressCircleView = ({
  percentage,
  barDash,
  barGap,
  progressDash,
  progressGap,
  rotation,
}: ProgressCircleVAProps) => (
  <Svg viewBox="0 0 100 100">
    <defs>
      <linearGradient id="rainbowGradient" x1="100%" y1="0%" x2="0%" y2="0%">
        <Stop id="stop1" offset="0%" />
        <Stop id="stop2" offset="50%" />
        <Stop id="stop3" offset="100%" />
      </linearGradient>
    </defs>
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
        stroke: percentage === 100 ? 'url(#rainbowGradient)' : '#59B9FF',
        strokeDasharray: `${progressDash} ${progressGap}`,
        transformOrigin: 'center center',
        transform: `rotate(${rotation}deg)`,
      }}
    />
  </Svg>
);

export default ProgressCircleView;

const Stop = styled.stop`
  &#stop1 {
    stop-color: hotpink;
  }
  &#stop2 {
    stop-color: yellow;
  }
  &#stop3 {
    stop-color: deepskyblue;
  }
`;

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
