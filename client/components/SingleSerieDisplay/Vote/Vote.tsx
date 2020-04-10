import { DataType, DataTypeLabels, TimeType, TimeTypeLabels } from 'client/types';
import React from 'react';
// import ProgressBar from 'react-bootstrap/ProgressBar'
import Table from 'react-bootstrap/Table'

import VoteController, { VoteControllerProps } from './VoteController';

export interface VoteProps extends VoteControllerProps {
  actualValue: number;
  nextPredictedValue: number;

  dataType: DataType;
  timeType: TimeType;
  serieName: string;
}

const Vote = ({
  actualValue,
  nextPredictedValue,
  voteUp,
  voteDown,
  completed,
  dataType,
  timeType,
  serieName
}: VoteProps) => {


  const predictedGrowthRate = ((nextPredictedValue - actualValue) / actualValue) * 100;

  return (
    <div>
      <Table bordered>
        <thead>
        </thead>
        <tbody>
          <tr>
            <th>{serieName}, {TimeTypeLabels[timeType]} {DataTypeLabels[dataType]}</th>
            <td>{new Intl.NumberFormat().format(actualValue)}</td>
          </tr>
          <tr>
            <th>{serieName}, {DataTypeLabels[dataType]} prediction for {timeType === TimeType.DAILY ? 'tomorrow' : 'next week'}</th>
            <td>
              {new Intl.NumberFormat().format(nextPredictedValue)}<br />
              <small style={{ color: predictedGrowthRate >= 0 ? 'green' : 'red' }}>{predictedGrowthRate >= 0 ? '+' : ''}{predictedGrowthRate.toFixed(2)}%</small>
            </td>
          </tr>
          <tr>
            <th>Do you think the value will go higher or lower?</th>
            <td><VoteController
              voteUp={voteUp}
              voteDown={voteDown}
              completed={completed} /></td>
          </tr>
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
