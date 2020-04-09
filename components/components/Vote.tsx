import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';

export interface VoteProps {
  voteUp: () => void;
  voteDown: () => void;
  completed: boolean;
}

const Vote = ({ voteUp, voteDown, completed }: VoteProps) => (
  <div>
    {
      !completed &&
      <Fragment>
        <Button data-testid="vote up" onClick={voteUp} />
        <Button data-testid="vote down" onClick={voteDown} />
      </Fragment>
    }
  </div>
)

export default Vote;
