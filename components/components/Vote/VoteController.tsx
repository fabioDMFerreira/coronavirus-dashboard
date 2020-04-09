import React, { Fragment } from 'react';
import * as Icon from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';

export const COMPLETED_MESSAGE = 'Thank you for your vote';

export interface VoteControllerProps {
  voteUp: () => void;
  voteDown: () => void;
  completed: boolean;
}

const VoteController = ({ voteUp, voteDown, completed }: VoteControllerProps) => (
  <div>
    {
      !completed &&
      <Fragment>
        <Button variant="link" className="vote-up" data-testid="vote up" onClick={voteUp}><Icon.CaretUpFill /> Higher</Button>
        <Button variant="link" className="vote-down" data-testid="vote down" onClick={voteDown}><Icon.CaretDownFill /> Lower</Button>
      </Fragment>
    }
    {
      completed &&
      <span data-testid="completed message">
        {COMPLETED_MESSAGE}
      </span>
    }
  </div>
)

export default VoteController;
