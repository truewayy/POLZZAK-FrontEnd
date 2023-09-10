import { Box, Flex, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import QABox from './QABox';

interface QuestionListProps {
  questions: {
    category: string;
    qa: {
      question: string;
      answer: string;
    }[];
  }[];
}

const QuestionList = ({ questions }: QuestionListProps) => {
  const [currentType, setCurrentType] = useState('도장판');
  const handleClickQuestionType = (type: string) => {
    setCurrentType(type);
  };

  return (
    <VStack w="100%" spacing="8px" pb="86px">
      <Flex w="100%" justify="space-between" align="center">
        {questions.map(({ category }, idx) => (
          <Box
            key={category}
            w="100%"
            p="16px 0"
            layerStyle={
              currentType === category ? 'caption12Sbd' : 'caption12Md'
            }
            textAlign="center"
            borderLeft={idx === 0 ? 'none' : '1px solid'}
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor="gray.300"
            bg={currentType === category ? 'polzzak.default' : 'white'}
            color={currentType === category ? 'white' : 'gray.600'}
            onClick={() => handleClickQuestionType(category)}
          >
            {category}
          </Box>
        ))}
      </Flex>
      <VStack w="100%" spacing="0px">
        {questions.map(
          ({ category, qa }) =>
            category === currentType &&
            qa.map(({ question, answer }) => (
              <QABox key={question} question={question} answer={answer} />
            ))
        )}
      </VStack>
    </VStack>
  );
};

export default QuestionList;
