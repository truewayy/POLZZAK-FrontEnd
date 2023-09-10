/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
import { Flex, Icon, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { ChevronDown, ChevronUp } from '@/public/icon';

interface QABoxProps {
  question: string;
  answer: string;
  bold?: string;
}

const QABox = ({ question, answer, bold }: QABoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <VStack
      w="100%"
      p="16px"
      spacing="16px"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Flex
        w="100%"
        gap="16px"
        align="center"
        justify="space-between"
        onClick={handleToggle}
      >
        <Text layerStyle="body14Md">
          {bold
            ? question.split(bold).map((text, index) => (
                <Text as="span" key={index}>
                  {text}
                  {index !== question.split(bold).length - 1 && <b>{bold}</b>}
                </Text>
              ))
            : question}
        </Text>
        <Icon
          as={isOpen ? ChevronUp : ChevronDown}
          w="24px"
          h="24px"
          fill="gray.500"
        />
      </Flex>
      {isOpen && (
        <VStack p="16px" bg="gray.100">
          <Text layerStyle="caption12Md" color="gray.700">
            {answer}
          </Text>
        </VStack>
      )}
    </VStack>
  );
};

export default QABox;
