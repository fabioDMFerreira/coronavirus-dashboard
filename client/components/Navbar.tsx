import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import BellIcon from '../icons/BellIcon';
import TwitterIcon from '../icons/TwitterIcon';

export interface NavbarProps {
  tweet: () => void;
  tabSelected: string;
  selectTab: (value: string) => void;
  openSubscribeModal: () => void;
}

export default ({ tweet, tabSelected, selectTab, openSubscribeModal }: NavbarProps) => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Covid-19</Navbar.Brand>
    <Navbar.Collapse>
      <Nav.Item>
        <Button variant="link" className={tabSelected === "country" ? 'active' : ''} onClick={() => selectTab("country")}>All Countries</Button>
      </Nav.Item>
      <Nav.Item>
        <Button variant="link" className={tabSelected === "usa" ? 'active' : ''} onClick={() => selectTab("usa")}>USA</Button>
      </Nav.Item>
    </Navbar.Collapse>
    <Form inline>
      <Button className="mr-2" variant="primary" onClick={tweet}>
        <TwitterIcon />
        {' '}
  Tweet
      </Button>
      <Button variant="warning" onClick={openSubscribeModal}>
        <BellIcon />
        {' '}
  Subscribe
      </Button>
    </Form>
  </Navbar>
);
