import { DataType, TimeType } from "client/types";
import fetch from "node-fetch";
import { useEffect, useState } from 'react';

export default (dataType: DataType, timeType: TimeType, serieName: string, enabled: boolean): [boolean, number, number] => {

  if (!enabled) {
    return [false, 50, 50];
  }

  const [upVotes, setUpVotes] = useState(50);
  const [downVotes, setDownVotes] = useState(50);
  const [error, setError] = useState<undefined | Error>();
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      setError(undefined);
      setLoading(true);

      fetch(`/api/votes/results?dataType=${dataType}&timeType=${timeType}&resource=${serieName}`)
        .then(res => res.json())
        .then(data => {
          setUpVotes(data.up);
          setDownVotes(data.down);
        })
        .catch(err => {
          setError(err);
        })
        .then(() => {
          setLoading(false);
        })
    }, [dataType, timeType, serieName]
  )

  if (error) {
    return [false, 50, 50];
  } else if (!loading) {
    return [true, 50, 50];
  } else {
    return [false, upVotes, downVotes];
  }
}
