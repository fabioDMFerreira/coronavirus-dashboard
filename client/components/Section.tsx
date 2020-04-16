import React, { Fragment } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default ({ title, children }: any) => (
  <Container fluid>
    <Row className="pb-3">
      <Col xs={12}>
        {
          title &&
          <Fragment>
            <h2> {title}</h2>
            <hr />
          </Fragment>
        }
        {
          children
        }
      </Col>
    </Row>
  </Container >
)
