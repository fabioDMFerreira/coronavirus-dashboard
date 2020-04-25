import { useRouter } from 'next/router';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import BellIcon from '../icons/BellIcon';
import TwitterIcon from '../icons/TwitterIcon';

export interface RouterNavbarProps {
  tweet: () => void;
  openSubscribeModal: () => void;
}

export default ({ tweet, openSubscribeModal }: RouterNavbarProps) => {
  const router = useRouter();

  const changeRoute = (route: string) => () => {
    router.push(route);
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="#home">Covid-19</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto mt-3 mt-md-0">
          <Nav.Item>
            <Button variant="link" onClick={changeRoute('/countries')} className={router.pathname === '/countries' ? 'active' : ''}>All Countries</Button>
          </Nav.Item>
          <Nav.Item>
            <Button variant="link" onClick={changeRoute('/usa')} className={router.pathname === '/usa' ? 'active' : ''} >USA</Button>
          </Nav.Item>
        </Nav>
        <Form inline className="mt-3 mt-md-0">
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
      </Navbar.Collapse>

    </Navbar >
  );
};
