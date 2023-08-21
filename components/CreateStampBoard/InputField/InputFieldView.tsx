/* eslint-disable no-nested-ternary */
import { Button, Flex, Text, VStack } from '@chakra-ui/react';
import { Control, FieldValues } from 'react-hook-form';
import Sheet from 'react-modal-sheet';

import {
  missionValidate,
  nameValidate,
  rewardValidate,
  stampCountValidate,
} from '@/constants/validate';
import { DeleteIcon, ListIcon } from '@/public/icon';

import MissionExamples from '../MissionExamples';
import CustomInput from './Field/CustomInput';
import CustomRadio from './Field/CustomRadio';

interface InputFieldVAProps {
  handleClickAddButton: () => void;
  handleClickDeleteButton: (id: number) => void;
  handleClickMissionExample: () => void;
  handleClickMissionModalCloseButton: () => void;
  missionValue: (id: number) => string;
  control: Control<FieldValues, any>;
  missions: { id: number; content: string }[];
  missionModal: boolean;
  isMissionLimit: boolean;
  stampCount: number[];
}

const InputFieldView = ({
  handleClickAddButton,
  handleClickDeleteButton,
  handleClickMissionExample,
  handleClickMissionModalCloseButton,
  missionValue,
  control,
  missions,
  missionModal,
  isMissionLimit,
  stampCount,
}: InputFieldVAProps) => (
  <VStack spacing="24px" w="100%" pos="relative">
    <VStack w="100%" spacing="8px" align="flex-start">
      <Text layerStyle="subtitle16Sbd">이름</Text>
      <CustomInput
        name="name"
        h="50px"
        maxLength={20}
        placeholder="도장판 이름을 입력해주세요"
        rules={nameValidate}
        control={control}
      />
    </VStack>
    <VStack w="100%" spacing="8px" align="flex-start">
      <Text layerStyle="subtitle16Sbd">보상</Text>
      <CustomInput
        name="reward"
        h="50px"
        maxLength={30}
        placeholder="도장판을 다 모으면 어떤 선물을 줄까요?"
        rules={rewardValidate}
        control={control}
      />
    </VStack>
    <VStack w="100%" spacing="8px" align="flex-start">
      <Text layerStyle="subtitle16Sbd">도장 개수</Text>
      <CustomRadio
        name="goalStampCount"
        options={stampCount}
        control={control}
        rules={stampCountValidate}
      />
    </VStack>
    <VStack w="100%" spacing="5px" align="flex-start">
      <Text layerStyle="subtitle16Sbd">미션</Text>
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
          variant="unstyled"
          alignSelf="flex-start"
          bg="none"
          w="90%"
          h="45px"
          p="0 16px"
          border="1px dashed"
          borderColor="gray.300"
          borderRadius="8px"
          onClick={handleClickAddButton}
          isDisabled={isMissionLimit}
        >
          <Text
            w="100%"
            textAlign="left"
            layerStyle="body14Md"
            color="gray.400"
          >
            {isMissionLimit ? '미션은 50개까지 만들 수 있어요' : '+ 미션 추가'}
          </Text>
        </Button>
        <Button
          w="100%"
          h="50px"
          p="12px 24px"
          bg="gray.400"
          borderRadius="8px"
          onClick={handleClickMissionExample}
        >
          <ListIcon w="18px" h="18px" mr="8px" />
          <Text layerStyle="subtitle16Sbd" color="white">
            미션예시
          </Text>
        </Button>
      </VStack>
    </VStack>
    <Sheet
      isOpen={missionModal}
      onClose={handleClickMissionModalCloseButton}
      snapPoints={[500, 320, 200, 0]}
      initialSnap={0}
      style={{
        maxWidth: '560px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <VStack w="100%" h={400} bg="white" p="0 20px" spacing="20px">
            <Text layerStyle="subtitle16Sbd">
              마음에 드는 미션들을 추가해보세요!
            </Text>
            <MissionExamples onClose={handleClickMissionModalCloseButton} />
          </VStack>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={handleClickMissionModalCloseButton} />
    </Sheet>
  </VStack>
);

export default InputFieldView;
