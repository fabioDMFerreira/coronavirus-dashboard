import { DataType, DataTypeLabels, TimeType, TimeTypeLabels } from 'client/types';
import React, { Fragment } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table'

import usePullSurveyResultsHook from './usePullSurveyResultsHook';
import VoteController, { VoteControllerProps } from './VoteController';

const PULL_SURVEY_RESULTS = true;

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

  const [loadingSurveyResults, upSurveyResults, downSurveyResults] = usePullSurveyResultsHook(dataType, timeType, serieName, PULL_SURVEY_RESULTS);

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
            <td>
              <VoteController
                voteUp={voteUp}
                voteDown={voteDown}
                completed={completed}
              />
              {
                PULL_SURVEY_RESULTS &&
                <Fragment>
                  {
                    !loadingSurveyResults &&
                    <div className="mt-3">
                      <small>
                        Survey results
                      </small>
                      <ProgressBar className="mt-1">
                        <ProgressBar variant="success" label={`${upSurveyResults}%`} now={upSurveyResults || 50} key={1} />
                        <ProgressBar variant="danger" label={`${downSurveyResults}%`} now={downSurveyResults || 50} key={2} />
                      </ProgressBar>
                    </div>
                  }
                  {
                    loadingSurveyResults &&
                    <Spinner animation="grow" />
                  }
                </Fragment>
              }
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Vote;
