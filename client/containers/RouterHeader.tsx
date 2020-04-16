import RouterNavbar from '@components/RouterNavbar';
import fetch from 'isomorphic-unfetch';
import React, { Fragment, useState } from 'react';
import { useStore } from 'react-redux';

import AffixWrapper from '../components/AffixWrapper';
import SubscribeModal from '../components/SubscribeModal';

export interface RouterHeaderProps {
}

export default ({ }: RouterHeaderProps) => {
  const [subscribeModal, setSubscribeModal] = useState(false);
  const store = useStore();

  const tweet = async () => {
    try {
      const hash = await fetch('/api/state', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: store.getState() }),
      }).then((res) => res.text());

      const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}?view=${hash}`;
      window.location.href = `https://twitter.com/intent/tweet?text=Check here the coronavirus growth&url=${url}`;
    } catch (err) {

    }
  };

  return (
    <Fragment>
      <AffixWrapper offset={40} className="fixed-top">
        <RouterNavbar
          tweet={tweet}
          openSubscribeModal={() => { setSubscribeModal(true) }}
        />
      </AffixWrapper>
      {
        subscribeModal
        && <SubscribeModal onClose={() => setSubscribeModal(false)} />
      }
    </Fragment>
  );
}
