import React, { useReducer } from 'react';
import styled from 'styled-components';
import { QandA, Answer } from '../types';

type Props = {
  qanda: QandA /* individual question + associated answers */;
};

type Action = {
  type: string;
  payload: Answer;
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

function reducer(state: QandA, action: Action) {
  switch (action.type) {
    case 'vote': {
      const updatedAnswers = state.answers.map((ans) => {
        if (ans === action.payload) {
          // Increment the chosen answer
          return Object.assign({}, ans, {
            votes: ans.votes + 1,
          });
        }
        return ans;
      });
      return Object.assign({}, state, {
        answers: updatedAnswers,
      });
    }
    default:
      throw new Error();
  }
}

export default function Question({ qanda }: Props) {
  // Store in local state to enable modifying votes
  const [state, dispatch] = useReducer(reducer, qanda);

  const totalVotes = state.answers.reduce((acc, ans) => acc + ans.votes, 0);

  return (
    <QuestionContainer>
      <h2>{state.question.text}</h2>
      {state.answers.map((answer) => (
        <AnswerContainer
          key={answer.text}
          onClick={() => {
            dispatch({ type: 'vote', payload: answer });
          }}
        >
          {answer.text}
        </AnswerContainer>
      ))}
      <VotesContainer>{`${totalVotes} votes`} </VotesContainer>
    </QuestionContainer>
  );
}
