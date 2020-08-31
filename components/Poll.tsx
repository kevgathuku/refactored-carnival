import * as React from 'react';
import styled from 'styled-components';
import * as _ from 'lodash';
import { QandAsDocument } from '../types';
import QuestionContainer from './Question';

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

const PollWrapper = styled.div`
  margin: 40px auto;
  width: 350px;
`;

export default function Poll({ qandas }: Props) {
  const questionIndex = _.random(0, qandas.questions.length - 1);

  console.log('questions and answers: ', qandas);
  return (
    <PollWrapper>
      <QuestionContainer qanda={qandas.questions[questionIndex]} />
    </PollWrapper>
  );
}
