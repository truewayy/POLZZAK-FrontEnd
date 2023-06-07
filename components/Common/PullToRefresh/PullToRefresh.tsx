/* eslint-disable react/require-default-props */
import { Spinner } from '@chakra-ui/react';
import { useDrag } from '@use-gesture/react';
import { useEffect, useRef, useState } from 'react';

import { PullingIcon } from '@/public/icon';
import getScrollParent from '@/utils/getScrollParent';
import sleep from '@/utils/sleep';

import PullToRefreshView from './PullToRefreshView';

type PullStatus = 'pulling' | 'canRelease' | 'refreshing' | 'complete';

interface PullToRefreshProps {
  onRefresh: () => Promise<any>;
  pullingComponent?: React.ReactNode;
  canReleaseComponent?: React.ReactNode;
  refreshingComponent?: React.ReactNode;
  completeComponent?: React.ReactNode;
  completeDelay?: number;
  headHeight?: number;
  threshold?: number;
  disabled?: boolean;
  children: React.ReactNode;
}

const PullToRefresh = ({
  onRefresh,
  pullingComponent = <PullingIcon w={33} h={33} />,
  canReleaseComponent = <PullingIcon w={33} h={33} />,
  refreshingComponent = (
    <Spinner color="blue.400" emptyColor="polzzak.disabled" thickness="3px" />
  ),
  completeComponent = (
    <Spinner color="blue.400" emptyColor="polzzak.disabled" thickness="3px" />
  ),
  headHeight = 50,
  threshold = 60,
  disabled = false,
  completeDelay = 0,
  children,
}: PullToRefreshProps) => {
  const [status, setStatus] = useState<PullStatus>('pulling');
  const requestRef = useRef<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const pullingRef = useRef(false);

  useEffect(
    () => () => {
      cancelAnimationFrame(requestRef.current);
    },
    []
  );

  // 밑으로 당겼을 때 함수
  const slideDown = (height: number, cb?: () => void) => {
    requestAnimationFrame(function animate() {
      const currentHeight = headRef.current!.clientHeight;
      if (currentHeight > height) {
        const decreasing = currentHeight - height > 20 ? 10 : 1;
        headRef.current!.style.height = `${currentHeight - decreasing}px`;
        requestRef.current = requestAnimationFrame(animate);
      }

      if (currentHeight === height) {
        if (cb) {
          cb();
        }
      }
    });
  };

  // 위로 올렸을 때 함수
  const slideUp = (height: number, cb?: () => void) => {
    requestAnimationFrame(function animate() {
      const currentHeight = headRef.current!.clientHeight;
      if (currentHeight > height) {
        headRef.current!.style.height = `${currentHeight - 1}px`;
        requestRef.current = requestAnimationFrame(animate);
      }

      if (currentHeight === height) {
        if (cb) {
          cb();
        }
      }
    });
  };

  // 새로고침 함수
  const doRefresh = async () => {
    slideDown(headHeight);
    setStatus('refreshing');
    try {
      await onRefresh?.();
      await sleep(500);
      setStatus('complete');
    } catch (e) {
      slideDown(0, () => {
        setStatus('pulling');
      });
      setStatus('pulling');
      throw e;
    }
    if (completeDelay > 0) {
      await sleep(completeDelay);
    }

    slideDown(0, () => {
      setStatus('pulling');
    });
  };

  // 드래그 이벤트
  useDrag(
    (state) => {
      if (status === 'refreshing' || status === 'complete') return;

      const { event } = state;

      if (state.last) {
        pullingRef.current = false;
        if (status === 'canRelease') {
          doRefresh();
        } else {
          slideUp(0);
        }
        return;
      }

      const [, y] = state.movement;
      // 첫 이벤트 시점에 pullToRefresh 발동이 가능한지 체크한다.
      // 스크롤이 최상단에 존재해야만(scrollTop=0) pullToRefresh 의 발동 조건이다.
      if (state.first && y > 0) {
        const { target } = state.event;
        if (!target || !(target instanceof Element)) return;
        let scrollParent = getScrollParent(target);
        while (scrollParent) {
          const getScrollTop = (element: Window | Element) =>
            'scrollTop' in element ? element.scrollTop : element.scrollY;

          // for 중첩 스크롤 영역
          if (!scrollParent) return;
          const scrollTop = getScrollTop(scrollParent);
          if (scrollTop > 0) {
            return;
          }
          if (scrollParent instanceof Window) {
            break;
          }
          scrollParent = getScrollParent(scrollParent.parentNode as Element);
        }
        pullingRef.current = true;
        // eslint-disable-next-line no-inner-declarations
      }

      if (!pullingRef.current) return;

      if (event.cancelable) {
        event.preventDefault();
      }
      event.stopPropagation();

      if (y < headHeight) {
        headRef.current!.style.height = `${y}px`;
      } else {
        headRef.current!.style.height = `${
          headHeight + (y - headHeight) * 0.25
        }px`;
      }
      setStatus(y > threshold ? 'canRelease' : 'pulling');
    },
    {
      pointer: { touch: true },
      axis: 'y',
      target: elementRef,
      enabled: !disabled,
      eventOptions: { passive: false },
    }
  );

  const PullToRefreshVAProps = {
    status,
    pullingComponent,
    canReleaseComponent,
    refreshingComponent,
    completeComponent,
    elementRef,
    headRef,
    headHeight,
    children,
  };

  return <PullToRefreshView {...PullToRefreshVAProps} />;
};

export default PullToRefresh;
