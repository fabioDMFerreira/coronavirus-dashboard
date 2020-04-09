import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Vote, { COMPLETED_MESSAGE, VoteControllerProps } from './VoteController';

const stubProps: VoteControllerProps = {
  voteUp: jest.fn(),
  voteDown: jest.fn(),
  completed: false
}

const getTestElement = (testId: string) => {
  return screen.getByTestId(testId);
}

const TEST_IDS = {
  voteUp: "vote up",
  voteDown: "vote down",
  completedMessage: "completed message"
}

describe('Vote', () => {
  it('should render', () => {
    render(<Vote {...stubProps} />);
  });

  it('should have two voting buttons', () => {
    render(<Vote {...stubProps} />)

    expect(getTestElement(TEST_IDS.voteUp));
    expect(getTestElement(TEST_IDS.voteDown));
  })

  it('clicking vote buttons should call prop functions', () => {
    const voteUp = jest.fn();
    const voteDown = jest.fn();

    render(<Vote {...stubProps} voteUp={voteUp} voteDown={voteDown} />)

    fireEvent.click(getTestElement(TEST_IDS.voteUp));

    expect(voteUp).toHaveBeenCalledTimes(1);
    expect(voteDown).toHaveBeenCalledTimes(0);

    fireEvent.click(getTestElement(TEST_IDS.voteDown));

    expect(voteUp).toHaveBeenCalledTimes(1);
    expect(voteDown).toHaveBeenCalledTimes(1);
  })

  it('should hide vote buttons and display thank you message if vote is already made', () => {
    const { queryByTestId } = render(<Vote {...stubProps} completed />)

    expect(queryByTestId(TEST_IDS.voteUp)).toBeFalsy();
    expect(queryByTestId(TEST_IDS.voteDown)).toBeFalsy();

    expect(queryByTestId(TEST_IDS.completedMessage)?.innerHTML).toBe(COMPLETED_MESSAGE);
  })
});
