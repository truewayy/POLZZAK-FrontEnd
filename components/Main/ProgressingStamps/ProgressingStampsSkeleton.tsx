import { Skeleton, VStack } from '@chakra-ui/react';

interface ProgressingStampsSkeletonProps {
  filter: string;
}

const ProgressingStampsSkeleton = ({
  filter,
}: ProgressingStampsSkeletonProps) =>
  filter === '전체' ? (
    <VStack w="100%" spacing="32px" p="0 5%">
      <VStack w="100%" spacing="13px">
        <Skeleton
          w="50%"
          borderRadius="8px"
          height="30px"
          alignSelf="flex-start"
        />
        <Skeleton w="100%" borderRadius="8px" height="377px" />
      </VStack>
      <VStack w="100%" spacing="13px">
        <Skeleton
          w="50%"
          borderRadius="8px"
          height="30px"
          alignSelf="flex-start"
        />
        <Skeleton w="100%" borderRadius="8px" height="377px" />
      </VStack>
    </VStack>
  ) : (
    <VStack w="100%" spacing="20px" p="0 5%">
      <Skeleton w="100%" borderRadius="8px" height="377px" />
      <Skeleton w="100%" borderRadius="8px" height="377px" />
    </VStack>
  );

export default ProgressingStampsSkeleton;
