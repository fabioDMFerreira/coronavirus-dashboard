import fetch from 'isomorphic-unfetch';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import ReactGA from 'react-ga';

interface SubscribeModalProps {
  onClose: () => void;
}

export default ({ onClose }: SubscribeModalProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      ReactGA.event({
        category: 'Subscription',
        action: 'Created a subscription',
        label: email,
      });

      setSubmitted(true);
    } catch (err) {
      setError('Please');
    }
  };

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Modal show autoFocus onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Subscribe</Modal.Title>
        </Modal.Header>

        <Modal.Body className="mb-5">
          {
            !submitted
              && (
                <Form onSubmit={submit}>
                  <Form.Control type="hidden" isInvalid={!!error} />
                  <InputGroup className="mb-3 mt-3">
                    <FormControl value={email} onChange={changeEmail} required size="lg" type="email" placeholder="Enter email" />
                    <InputGroup.Append>
                      <Button variant="primary" type="submit">
                      Submit
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">{"Something wrong happened. We're solving the problem. Please try again later."}</Form.Control.Feedback>
                  <Form.Text className="text-muted">
                  Subscribe to receive our reports.
                  </Form.Text>
                  <Form.Text className="text-muted">
                    {"We'll never share your email with anyone else."}
                  </Form.Text>
                </Form>
              )
          }
          {
            submitted
              && (
                <div>
                  {"Subscribed! You're registered to receive our reports."}
                </div>
              )
          }
        </Modal.Body>

      </Modal>
    </>
  );
};
