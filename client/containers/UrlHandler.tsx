import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { resetState } from '../redux/actions';
import { ReduxReducerState } from '../types';

export default () => {
  const dispatch = useDispatch();

  const validateStateHash = async (stateHash: string) => {
    const state: ReduxReducerState = await fetch(`/api/state?state=${stateHash}`).then((res) => res.json());

    if (state) {
      dispatch(resetState(state));
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);

    const stateHash = url.searchParams.get('view');
    if (stateHash) {
      validateStateHash(stateHash);
    }
  }, [validateStateHash]);

  return <span />;
};
