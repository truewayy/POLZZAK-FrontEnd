/* eslint-disable no-nested-ternary */
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { Control, FieldValues } from 'react-hook-form';

import {
  missionValidate,
  nameValidate,
  rewardValidate,
  stampCountValidate,
} from '@/constants/validate';
import { DeleteIcon, ListIcon } from '@/public/icon';

import CustomInput from './Field/CustomInput';
import CustomRadio from './Field/CustomRadio';

interface InputFieldVAProps {
  handleClickAddButton: () => void;
  handleClickDeleteButton: (id: number) => void;
  handleClickMissionExample: () => void;
  missionValue: (id: number) => string;
  control: Control<FieldValues, any>;
  missions: { id: number; content: string }[];
  isMissionLimit: boolean;
  stampCount: number[];
}

const InputFieldView = ({
  handleClickAddButton,
  handleClickDeleteButton,
  handleClickMissionExample,
  missionValue,
  control,
  missions,
  isMissionLimit,
  stampCount,
}: InputFieldVAProps) => (
  <VStack spacing="24px" w="100%">
    <VStack w="100%" spacing="8px" align="flex-start">
      <Text layerStyle="subtitle3">이름</Text>
      <CustomInput
        name="name"
        h="50px"
        maxLength={20}
        placeholder="도장판 이름을 입력해주세요"
        defaultValue=""
        rules={nameValidate}
        control={control}
      />
    </VStack>
    <VStack w="100%" spacing="8px" align="flex-start">
      <Text layerStyle="subtitle3">보상</Text>
      <CustomInput
        name="reward"
        h="50px"
        maxLength={30}
        placeholder="도장판을 다 모으면 어떤 선물을 줄까요?"
        defaultValue=""
        rules={rewardValidate}
        control={control}
      />
    </VStack>
    <VStack w="100%" spacing="8px" align="flex-start">
      <Text layerStyle="subtitle3">도장 개수</Text>
      <CustomRadio
        name="goalStampCount"
        options={stampCount}
        control={control}
        rules={stampCountValidate}
      />
    </VStack>
    <VStack w="100%" spacing="5px" align="flex-start">
      <Text layerStyle="subtitle3">미션</Text>
      <VStack
        w="100%"
        p="20px 10px"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="12px"
        spacing="8px"
      >
        {missions.map(({ id, content }) => (
          <Flex
            key={id}
            w="100%"
            justify="space-between"
            align="center"
            gap="8px"
            pos="relative"
          >
            <CustomInput
              name={`mission${id}`}
              w="90%"
              h="45px"
              maxLength={20}
              placeholder="미션을 입력해주세요"
              defaultValue={content}
              rules={missionValidate}
              control={control}
            />
            <DeleteIcon
              w={7}
              h={5}
              pos="absolute"
              top="10px"
              right="0"
              stroke={missionValue(id)?.length > 0 ? 'gray.400' : 'gray.300'}
              onClick={() => handleClickDeleteButton(id)}
            />
          </Flex>
        ))}
        <Button
          w="100%"
          h="45px"
          bg="blue.400"
          layerStyle="subtitle3"
          color="white"
          borderRadius="8px"
          _hover={{ bg: 'blue.400' }}
          onClick={handleClickAddButton}
          isDisabled={isMissionLimit}
        >
          {isMissionLimit ? '미션은 50개까지 만들 수 있어요' : '+ 미션 추가'}
        </Button>
        <Box
          p="5.5px 10px"
          bg="gray.500"
          color="white"
          borderRadius="20px"
          layerStyle="caption2"
          alignSelf="flex-end"
          onClick={handleClickMissionExample}
        >
          <ListIcon w="18px" h="18px" mr="4px" />
          미션예시
        </Box>
      </VStack>
    </VStack>
  </VStack>
);

export default InputFieldView;
