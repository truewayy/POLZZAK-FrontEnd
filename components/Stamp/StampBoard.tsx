/* eslint-disable react/no-array-index-key */
import { Box, Grid, Text } from '@chakra-ui/react';

interface BoardProps {
  count: 10 | 12 | 16 | 20 | 25 | 36 | 40 | 48 | 60;
}

const board = {
  10: {
    row: 3,
    column: 4,
  },
  12: {
    row: 3,
    column: 4,
  },
  16: {
    row: 4,
    column: 4,
  },
  20: {
    row: 5,
    column: 4,
  },
  25: {
    row: 5,
    column: 5,
  },
  36: {
    row: 6,
    column: 6,
  },
  40: {
    row: 8,
    column: 5,
  },
  48: {
    row: 8,
    column: 6,
  },
  60: {
    row: 10,
    column: 6,
  },
};

const StampBoard = ({ count }: BoardProps) => (
  <Grid
    templateColumns={`repeat(${board[count].column}, 1fr)`}
    templateRows={`repeat(${board[count].row}, 1fr)`}
    w="100%"
    p="20px 22px"
    rowGap="16px"
    columnGap="12px"
    border="1px solid"
    borderColor="gray.200"
    borderRadius="12px"
    bg="white"
  >
    {[...Array(count)].map((_, i) => (
      <Box
        key={i}
        pos="relative"
        w="100%"
        pt="100%"
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.200"
        color="gray.400"
        cursor="pointer"
        _hover={{ bg: 'blue.100', color: 'polzzak.highlighted' }}
      >
        <Text
          pos="absolute"
          lineHeight="100%"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          {i + 1}
        </Text>
      </Box>
    ))}
  </Grid>
);

export default StampBoard;
