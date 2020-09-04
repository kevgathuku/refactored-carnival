import React, { useReducer, useState } from 'react';
import styled, { css } from 'styled-components';
import { QandA, Answer } from '../types';

type Props = {
  qanda: QandA /* individual question + associated answers */;
};

type Action = {
  type: string;
  payload: Answer;
};

interface AnswerProps {
  voted: boolean;
  percentage: number;
  popularAnswer: Answer;
  answer: Answer;
}

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const AnswerContainer = styled.div<AnswerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px;
  margin: 5px 0;
  border: 1px solid gray;
  border-radius: 10px;
  cursor: pointer;
  position: relative;

  ${(props) =>
    props.voted &&
    css`
      font-weight: ${props.answer.text === props.popularAnswer.text
        ? 'bold'
        : 'normal'};

      &:after {
        content: '';
        position: absolute;
        background: ${props.answer.text === props.popularAnswer.text
          ? 'cyan'
          : '#dbddde'};
        top: 0;
        bottom: 0;
        left: 0;
        width: ${props.percentage}%;
        border-radius: 10px 0 0 10px;
        z-index: -1;
      }
    `}
`;

const CheckImage = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 10px;
`;

const AnswerCheck = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
          // Increment the chosen answer's votes
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
      return state;
  }
}

export default function Question({ qanda }: Props) {
  // Store in local state to enable modifying votes
  const [state, dispatch] = useReducer(reducer, qanda);
  const [voted, setVoted] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState<null | Answer>(null);

  const totalVotes = state.answers.reduce((acc, ans) => acc + ans.votes, 0);
  const popularAnswer = state.answers.reduce(function (acc, current) {
    return acc.votes > current.votes ? acc : current;
  });

  return (
    <QuestionContainer>
      <h2>{state.question.text}</h2>
      {state.answers.map((answer) => {
        const percentage = Math.round((answer.votes / totalVotes) * 100);

        return (
          <AnswerContainer
            key={answer.text}
            answer={answer}
            voted={voted}
            popularAnswer={popularAnswer}
            percentage={percentage}
            onClick={() => {
              if (!voted) {
                dispatch({ type: 'vote', payload: answer });
                setVoted(true);
                setChosenAnswer(answer);
              }
            }}
          >
            <AnswerCheck>
              <span>{answer.text}</span>
              {chosenAnswer && chosenAnswer.text === answer.text ? (
                <CheckImage src={require('../static/check-circle.svg')} />
              ) : null}
            </AnswerCheck>
            {voted && <span>{`${percentage}%`}</span>}
          </AnswerContainer>
        );
      })}
      <VotesContainer>{`${totalVotes} votes`} </VotesContainer>
    </QuestionContainer>
  );
}
