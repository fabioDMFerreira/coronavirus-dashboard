import Navbar from 'client/components/Navbar';
import fetch from 'isomorphic-unfetch';
import React, { Fragment, useState } from 'react';
import { useStore } from 'react-redux';

import AffixWrapper from '../components/AffixWrapper';
import SubscribeModal from '../components/SubscribeModal';

export interface HeaderProps {
  tab: string;
  setTab: (tab: string) => void;
}

export default ({ tab, setTab }: HeaderProps) => {
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

      const url = `${window.location.protocol}//${window.location.host}?view=${hash}`;
      window.location.href = `https://twitter.com/intent/tweet?text=Check here the coronavirus growth&url=${url}`;
    } catch (err) {

    }
  };

  return (
    <Fragment>
      <AffixWrapper offset={40} className="fixed-top">
        <Navbar
          tabSelected={tab}
          selectTab={setTab}
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
