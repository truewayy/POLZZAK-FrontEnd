import {
  Box,
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/dist/cjs/shared/types';

import { LeftArrow } from '@/public/icon';

interface DatepickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DatepickerModal = ({ isOpen, onClose }: DatepickerModalProps) => {
  const [date, setDate] = useState(new Date() as Value);
  // const [confirmedDate, setConfirmedDate] = useState(new Date());

  const handleChangeCalendar = (value: Value) => {
    setDate(value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent w="90%" borderRadius="12px">
        <VStack w="100%" spacing="0px">
          <Box
            w="100%"
            p="20px"
            layerStyle="subtitle16Sbd"
            color="#312F2E"
            textAlign="center"
            borderBottom="1px solid"
            borderColor="gray.200"
          >
            선물 예정일 설정
          </Box>
          <Calendar
            minDetail="month"
            maxDetail="month"
            minDate={new Date()}
            prev2Label={null}
            next2Label={null}
            nextLabel={
              <LeftArrow w="12px" h="12px" transform="rotate(180deg)" />
            }
            prevLabel={<LeftArrow w="12px" h="12px" />}
            formatDay={(_, day) => dayjs(day).format('D')}
            tileDisabled={({ date: day }) =>
              dayjs(day).isBefore(dayjs(), 'day')
            }
            showNeighboringMonth={false}
            value={date}
            onChange={handleChangeCalendar}
          />
          <Flex w="90%" gap="10px" p="30px 0 15px 0">
            <Button w="100%" h="auto" p="12px 24px" bg="gray.300" color="white">
              닫기
            </Button>
            <Button
              w="100%"
              h="auto"
              p="12px 24px"
              bg="polzzak.default"
              color="white"
            >
              설정 완료
            </Button>
          </Flex>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default DatepickerModal;
