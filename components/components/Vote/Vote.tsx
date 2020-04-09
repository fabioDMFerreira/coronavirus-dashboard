import React from 'react';
// import ProgressBar from 'react-bootstrap/ProgressBar'
import Table from 'react-bootstrap/Table'

import VoteController, { VoteControllerProps } from './VoteController';

export interface VoteProps {
  actualValue: number;
  nextPredictedValue: number;
}

const Vote = ({ actualValue, nextPredictedValue, voteUp, voteDown, completed }: VoteProps & VoteControllerProps ) => {


  return (
    <div>
      <Table bordered>
        <thead>
          <th>Actual Value</th>
          <th>Next Predicted Value</th>
          <th>Do you think the value will go higher or lower?</th>
        </thead>
        <tbody>
          <td>{new Intl.NumberFormat().format(actualValue)}</td>
          <td>{new Intl.NumberFormat().format(nextPredictedValue)}</td>
          <td><VoteController
            voteUp={voteUp}
            voteDown={voteDown}
            completed={completed} /></td>
        </tbody>
      </Table>
      {/* <ProgressBar>
        <ProgressBar variant="success" now={50} key={1} />
        <ProgressBar variant="danger" now={50} key={2} />
      </ProgressBar> */}
    </div>
  )
}

export default Vote;
