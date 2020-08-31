import * as React from 'react';
import styled from 'styled-components';
import { QandA } from '../types';

type Props = {
  qanda: QandA /* individual question + associated answers */;
};

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 5px;
  margin: 5px 0;
  border: 1px solid gray;
  border-radius: 10px;
  cursor: pointer;
`;

const VotesContainer = styled.div`
  align-self: flex-start;
  width: 100%;
  margin-top: 10px;
  color: gray;
`;

export default function Question({ qanda }: Props) {
  const votesCount = qanda.answers.reduce((acc, ans) => acc + ans.votes, 0);

  return (
    <QuestionContainer>
      <h2>{qanda.question.text}</h2>
      {qanda.answers.map((answer) => (
        <AnswerContainer key={answer.text}>{answer.text}</AnswerContainer>
      ))}
      <VotesContainer>{`${votesCount} votes`} </VotesContainer>
    </QuestionContainer>
  );
}
