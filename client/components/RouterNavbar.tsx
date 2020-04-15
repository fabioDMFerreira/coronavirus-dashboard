import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router'

import BellIcon from '../icons/BellIcon';
import TwitterIcon from '../icons/TwitterIcon';

export interface RouterNavbarProps {
  tweet: () => void;
  openSubscribeModal: () => void;
}

export default ({ tweet, openSubscribeModal }: RouterNavbarProps) => {
  const router = useRouter()

  const changeRoute = (route: string) => () => {
    router.push(route);
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home">Covid-19 Growth</Navbar.Brand>
        <Navbar.Collapse>
          <Nav.Item>
            <Button variant="link" onClick={changeRoute('/countries')} className={router.pathname === '/countries' ? 'active' : ''}>All Countries</Button>
          </Nav.Item>
          <Nav.Item>
            <Button variant="link" onClick={changeRoute('/usa')} className={router.pathname === '/usa' ? 'active' : ''} >USA</Button>
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
      </Container >
    </Navbar >
  )
}
