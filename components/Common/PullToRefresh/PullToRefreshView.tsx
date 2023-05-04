import { Box, Flex } from '@chakra-ui/react';

type PullStatus = 'pulling' | 'canRelease' | 'refreshing' | 'complete';

interface PullToRefreshVAProps {
  status: PullStatus;
  pullingComponent: React.ReactNode;
  canReleaseComponent: React.ReactNode;
  refreshingComponent: React.ReactNode;
  completeComponent: React.ReactNode;
  elementRef: React.RefObject<HTMLDivElement>;
  headRef: React.RefObject<HTMLDivElement>;
  headHeight: number;
  children: React.ReactNode;
}

const PullToRefreshView = ({
  status,
  elementRef,
  headRef,
  headHeight,
  children,
  ...restProps
}: PullToRefreshVAProps) => {
  const renderStatusComponent = {
    pulling: restProps.pullingComponent,
    canRelease: restProps.canReleaseComponent,
    refreshing: restProps.refreshingComponent,
    complete: restProps.completeComponent,
  };
  return (
    <Box ref={elementRef}>
      <Box ref={headRef} overflow="hidden" pos="relative">
        <Flex
          pos="absolute"
          bottom={0}
          left={0}
          w="100%"
          mb="20px"
          h={headHeight}
          align="flex-end"
          justify="center"
        >
          {renderStatusComponent[status]}
        </Flex>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default PullToRefreshView;
