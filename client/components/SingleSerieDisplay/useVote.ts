import fetch from "node-fetch";
import { useEffect, useState } from "react";

export default (element: any): [boolean, () => void, () => void] => {
  const [voteCompleted, setVoteCompleted] = useState(false);

  useEffect(() => {
    setVoteCompleted(false);
  }, [JSON.stringify(element)]);

  const vote = async (type: boolean) => {
    await fetch('/api/votes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        state: element
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setVoteCompleted(true);
        }
      })
      .catch(_err => {
        // TODO:
      });

  };

  const voteUp = () => {
    vote(true);
  };

  const voteDown = () => {
    vote(false);
  };

  return [voteCompleted, voteUp, voteDown];
};
