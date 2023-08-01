import { keyframes, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';

const Loading = () => (
  <VStack
    w="100%"
    h="100vh"
    justify="center"
    align="center"
    pos="fixed"
    top="0"
    left="0"
    zIndex="999"
    spacing="0"
    bg="rgba(0,0,0,0.5)"
  >
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
    >
      <g opacity="0.1">
        <path
          d="M24.4168 8C34.0292 8 41.8337 15.8045 41.8337 25.4168C41.8337 35.0292 34.0292 42.8337 24.4168 42.8337C14.8045 42.8337 7 35.0292 7 25.4168C7 15.8045 14.8045 8 24.4168 8Z"
          stroke="#59B9FF"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </g>
      <g opacity="0.8">
        <path
          d="M35.7422 12.3242C43.0602 18.7408 43.9224 29.7604 37.6664 36.9161C37.2703 37.3692 36.8551 37.796 36.4229 38.1964"
          stroke="#59B9FF"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </g>
    </Svg>
  </VStack>
);

export default Loading;

const spinAnimation = keyframes`
0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
}`;

const Svg = styled.svg`
  animation: ${spinAnimation} 1s linear infinite;
  transform-origin: center center;
`;
